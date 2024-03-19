import express from 'express';
import React   from 'react';

import {
    database,
    allPeopleDocs,
    allPublicationsDocs,
    allAwardsDocs,
    bySeniority,
    byAuthorship,
    byPublicationMonth,
    byDate,
    render
} from './src/utils';

import Vision      from './src/Vision';
import Publication from './src/Publication';
import Contact     from './src/Contact';

import Header      from './src/Header';
import Tile        from './src/Tile';
import Content     from './src/Content';
import Divider     from './src/Divider';
import Thumbnail   from './src/Thumbnail';
import Footer      from './src/Footer';

const app = express();

// static routing
app.use('/images', express.static('images'));
app.use('/pdf', express.static('pdf'));

// vision
app.get('/', (req, res) => {
    res.send(render([
        <Header selected="vision"/>,
        <Vision/>,
        <Footer/>
    ]));
});

app.get('/vision', (req, res) => {
    res.send(render([
        <Header selected="vision"/>,
        <Vision/>,
        <Footer/>
    ]));
});

// people
app.get('/people', (req, res) => {
    res.send(render([
        <Header selected="people"/>,

        // current members
        allPeopleDocs
            .filter(doc => !doc.subtitle.includes('M.S.') && !doc.subtitle.includes('Ph.D.'))
            .sort(bySeniority)
            .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),

        // alumni
        <Divider label="Ph.D. alumni"/>,
        allPeopleDocs
            .filter(doc => doc.alumni && doc.alumni.includes('Ph.D.'))
            .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),

        <Divider label="M.S. alumni"/>,
        allPeopleDocs
            .filter(doc => doc.alumni && doc.alumni.includes('M.S.'))
            .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),

        <Footer/>
    ]));
});

// publications
app.get('/publications', (req, res) => {
    res.send(render([
        <Header selected="publications"/>,
        allPublicationsDocs
            .sort(byPublicationMonth)
            .map(doc => <Publication { ...doc }/>),
        <Footer/>
    ]));

});

// awards
app.get('/awards', (req, res) => {
    res.send(render([
        <Header selected="awards"/>,
        allAwardsDocs
            .sort(byDate)
            .map(doc => <Tile showSupertitle { ...doc }/>),
        <Footer/>
    ]));
});

// contact
app.get('/contact', (req, res) => {
    res.send(render([
        <Header selected="contact"/>,
        <Contact/>,
        <Footer/>
    ]));
});

// all content pages
app.get('/:a/:b', (req, res) => {
    const { a, b } = req.params;

    const requestedId = `/${ a }/${ b }`;
    const requestedDoc = database.find(doc => doc.id == requestedId);

    if (requestedDoc !== undefined) {
        const isRelated = doc => {
            return requestedDoc.reference.includes(doc.id) || // docs that this doc has referenced
                doc.reference.includes(requestedDoc.id); // other docs that have referenced to this doc
        }

        const relatedPeopleDocs = allPeopleDocs.filter(isRelated);
        const relatedPublicationsDocs = allPublicationsDocs.filter(isRelated);
        const relatedAwardsDocs = allAwardsDocs.filter(isRelated);

        const options = {};
        // for related documents of a people doc, bolden the person's name
        if (a === "people") {
            options.bolden = requestedDoc.title;
        }

        res.send(render([
            <Header selected={ a }/>,
            <Content { ...requestedDoc }/>,

            // people
            relatedPeopleDocs.length > 0 ? <Divider label="People"/> : null,
            ...(relatedPeopleDocs.length > 0
                ? relatedPeopleDocs
                    .sort(bySeniority)
                    .sort(byAuthorship(requestedDoc))
                    .map(doc => <Thumbnail { ...{ ...doc, options } }/>)
                : []
            ),

            // publications
            relatedPublicationsDocs.length > 0 ? <Divider label="Publications"/> : null,
            ...(relatedPublicationsDocs.length > 0
                ? relatedPublicationsDocs
                    .sort(byPublicationMonth)
                    .map(doc => <Thumbnail { ...{ ...doc, options } }/>)
                : []
            ),

            // awards
            relatedAwardsDocs.length > 0 ? <Divider label="Awards"/> : null,
            ...(relatedAwardsDocs.length > 0
                ? relatedAwardsDocs
                    .sort(byDate)
                    .map(doc => <Thumbnail { ...{ ...doc, options } }/>)
                : []
            ),

            <Footer/>
        ]));
    }

    else res.send();
});

// start website server
const port = process.env.PORT || 4564;
app.listen(port, () => {
    console.log(`SketchLab website started running! (port: ${ port })`);
});