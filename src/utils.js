import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AspectRatio from './AspectRatio';

// construct database from json files
export const database = [];
const directories = ['/technologies', '/products'];

directories.forEach(directory => {
    fs.readdirSync(`.${ directory }`).forEach(fileName => {
        // e.g.
        // fileName: joonhyublee.json
        // jsonName: joonhyublee
        const jsonName = fileName.split('.json')[0];
        database.push({
            ...JSON.parse(fs.readFileSync(`.${ directory }/${ fileName }`, 'utf8')),
            directory,
            jsonName,
            id: `${ directory }/${ jsonName }`
        });
    });
});

const belongsToDirectory = directory => doc => {
    return doc.id.split('/')[1] == directory.split('/')[1];
}

// helpers for querying & sorting
export const bySeniority = (docA, docB) => {
    const seniorities = {
        'Associate professor': 1,
        'Postdoctoral researcher': 2,
        'Ph.D.': 3,
        'Ph.D. student': 4,
        'M.S.': 5,
        'M.S. student': 6,
    };
    const fallback = 100;

    const seniorityA = seniorities[docA.subtitle] ? seniorities[docA.subtitle] : fallback;
    const seniorityB = seniorities[docB.subtitle] ? seniorities[docB.subtitle] : fallback;

    // sort from smallest number to biggest number
    return seniorityA - seniorityB;
}

export const byAuthorship = doc => (personA, personB) => {
    // if document's subtitle is a list,
    // assume that it is a list of the authors' names
    if (Array.isArray(doc.subtitle)) {
        const authorshipA = doc.subtitle.findIndex(name => name == personA.title);
        const authorshipB = doc.subtitle.findIndex(name => name == personB.title);

        // sort from smallest number to biggest number
        return authorshipA - authorshipB;

    // document's subtitle is not a list
    } else {

        // leave as same order
        return 0;
    }
}

export const byPublicationMonth = (docA, docB) => {
    const months = {
        'tei': 2,
        'cscw': 2,
        'chi': 4,
        'icra': 5,
        'siggraph': 7,
        'aui': 9,
        'ubicomp': 9,
        'uist': 10,
        'sa': 12
    };
    const fallback = 0;

    const yearA = parseInt(docA.jsonName.split('_')[0]);
    const monthA = months[docA.jsonName.split('_')[1]]
        ? months[docA.jsonName.split('_')[1]]
        : fallback;

    const yearB = parseInt(docB.jsonName.split('_')[0]);
    const monthB = months[docB.jsonName.split('_')[1]]
        ? months[docB.jsonName.split('_')[1]]
        : fallback;

    // sort from biggest number to smallest number
    return (yearB * 100 + monthB) - (yearA * 100 + monthA);
}

export const byDate = (docA, docB) => {
    const dateA = parseInt(docA.jsonName.split('_')[0]);
    const dateB = parseInt(docB.jsonName.split('_')[0]);

    // sort from biggest number to smallest number
    return dateB - dateA;
}

// export people, publications, and awards collections
export const allTechnologiesDocs = database.filter(belongsToDirectory(
    '/technologies'));
export const allProductsDocs = database.filter(belongsToDirectory(
    '/products'));
export const allPeopleDocs = database.filter(belongsToDirectory('/people'));
export const allPublicationsDocs = database.filter(belongsToDirectory(
    '/publications'));
export const allAwardsDocs = database.filter(belongsToDirectory('/awards'));

// prepare raw html file
const rawHtml = fs.readFileSync('./index.html', 'utf8');

// server-side react rendering
export const render = component => {
    return rawHtml
        .replace('<div id="root"></div>',
            ReactDOMServer.renderToStaticMarkup(
                <div className="container">
                    { component }
                </div>
            )
        );
}

// util for checking all item within content list is of same type
export const doAllItemsSatisfy = (items, doesItemSatisfy) => {
    return items.reduce((accumulator, currentItem) => {
        return accumulator && doesItemSatisfy(currentItem);
    }, true);
}

// util used for formatting content part of json
export const formatContentItem = contentItem => {
    // a simple text
    if (typeof contentItem == 'string') {
        return contentItem;

    // a list of texts
    } else if (Array.isArray(contentItem) && doAllItemsSatisfy(contentItem,
        item => typeof item == 'string')) {

        return contentItem.map(item => [item, <br/>]);

    // a link
    } else if (contentItem.link) {
        return <h3><a href={ contentItem.link }>{ contentItem.text }</a></h3>;

    // a list of links
    } else if (Array.isArray(contentItem) && doAllItemsSatisfy(contentItem,
        item => item.hasOwnProperty('link'))) {

        return contentItem.map(item =>
            <h3><a href={ item.link }>{ item.text }</a></h3>
        );

    // an image
    } else if (contentItem.image) {
        return <img src={ contentItem.image }/>;

    // a table of images
    } else if (Array.isArray(contentItem) && doAllItemsSatisfy(contentItem,
        item => item.hasOwnProperty('image'))) {

        return (
            <table>
                { contentItem.map(item => <td><img src={ item.image }/></td>) }
            </table>
        );

    // a youtube embed
    } else if (contentItem.youtube) {
        return (
            <AspectRatio
                aspectRatio={ contentItem.aspectRatio ? contentItem.aspectRatio : '16:9' }
            >
                <iframe
                    src={ contentItem.youtube }
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </AspectRatio>
        );

    // a sketchfab embed
    } else if (contentItem.sketchfab) {
        return (
            <AspectRatio
                aspectRatio={ contentItem.aspectRatio ? contentItem.aspectRatio : '16:9' }
            >
                <iframe
                    src={ contentItem.sketchfab }
                    // allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </AspectRatio>
        );

    // a table of sketchfab embed
    } else if (Array.isArray(contentItem) && doAllItemsSatisfy(contentItem,
        item => item.hasOwnProperty('sketchfab'))) {

        return (
            <table>
                { contentItem.map(contentItem =>
                    <td>
                        <AspectRatio
                            aspectRatio={ contentItem.aspectRatio ? contentItem.aspectRatio : '16:9' }
                        >
                            <iframe
                                src={ contentItem.sketchfab }
                                // allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </AspectRatio>
                    </td>
                )}
            </table>
        );

    // headings
    } else if (contentItem.h1) {
        return <h1>{ contentItem.h1 }</h1>;
    } else if (contentItem.h2) {
        return <h2>{ contentItem.h2 }</h2>;
    } else if (contentItem.h3) {
        return <h3>{ contentItem.h3 }</h3>;
    } else if (contentItem.h4) {
        return <h4>{ contentItem.h4 }</h4>;
    }
};