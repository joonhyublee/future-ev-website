import express from 'express';
import React   from 'react';

import {
    database,
    allTechnologiesDocs,
    allProductsDocs,
    allPeopleDocs,
    allPublicationsDocs,
    allAwardsDocs,
    bySeniority,
    byAuthorship,
    byPublicationMonth,
    byDate,
    render,
} from './src/utils';

import Intro       from './src/Intro';
import CEO         from './src/CEO';
import History     from './src/History';
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

// intro
app.get('/', (req, res) => {
    res.send(render([
        <Header selected="/intro"/>,
        <Intro/>,
        <Footer/>
    ]));
});

app.get('/intro', (req, res) => {
    res.send(render([
        <Header selected="/intro"/>,
        <Intro/>,
        <Footer/>
    ]));
});

// ceo
app.get('/ceo', (req, res) => {
    res.send(render([
        <Header selected="/ceo"/>,
        <CEO/>,
        <Footer/>
    ]));
});

// history
app.get('/history', (req, res) => {
    res.send(render([
        <Header selected="/history"/>,
        <History/>,
        <Footer/>
    ]));
});

// technologies
app.get('/technologies', (req, res) => {
    res.send(render([
        <Header selected="/technologies"/>,
        allTechnologiesDocs
            .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),
        <Footer/>
    ]));
});

// technologies
app.get('/products', (req, res) => {
    res.send(render([
        <Header selected="/products"/>,
        allProductsDocs
            .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),
        <Footer/>
    ]));
});

// // people
// app.get('/people', (req, res) => {
//     res.send(render([
//         <Header selected="people"/>,

//         // current members
//         allPeopleDocs
//             .filter(doc => !doc.subtitle.includes('M.S.') && !doc.subtitle.includes('Ph.D.'))
//             .sort(bySeniority)
//             .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),

//         // alumni
//         <Divider label="Ph.D. alumni"/>,
//         allPeopleDocs
//             .filter(doc => doc.alumni && doc.alumni.includes('Ph.D.'))
//             .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),

//         <Divider label="M.S. alumni"/>,
//         allPeopleDocs
//             .filter(doc => doc.alumni && doc.alumni.includes('M.S.'))
//             .map(doc => <Tile showSupertitle showSubtitle { ...doc }/>),

//         <Footer/>
//     ]));
// });

// // publications
// app.get('/publications', (req, res) => {
//     res.send(render([
//         <Header selected="publications"/>,
//         allPublicationsDocs
//             .sort(byPublicationMonth)
//             .map(doc => <Publication { ...doc }/>),
//         <Footer/>
//     ]));

// });

// // awards
// app.get('/awards', (req, res) => {
//     res.send(render([
//         <Header selected="awards"/>,
//         allAwardsDocs
//             .sort(byDate)
//             .map(doc => <Tile showSupertitle { ...doc }/>),
//         <Footer/>
//     ]));
// });

// // contact
// app.get('/contact', (req, res) => {
//     res.send(render([
//         <Header selected="contact"/>,
//         <Contact/>,
//         <Footer/>
//     ]));
// });

// all content pages
app.get('/:a/:b', (req, res) => {
    const { a, b } = req.params;

    const requestedId = `/${ a }/${ b }`;
    const requestedDoc = database.find(doc => doc.id == requestedId);

    if (requestedDoc !== undefined) {
        res.send(render([
            <Header selected={ a }/>,
            <Content { ...requestedDoc }/>,
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