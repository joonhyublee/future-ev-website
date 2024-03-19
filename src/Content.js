import React from 'react';
import AspectRatio from './AspectRatio';
import { formatContentItem } from './utils';

export default props => [
    <AspectRatio
        className="image-small"
        aspectRatio="4:3"
        style={{ marginBottom: 8 }}
    >
        <img src={ props.image }/>
    </AspectRatio>,

    <div className="image-small-content">
        { props.supertitle.map(text => <h3>{ text }</h3>)}
        { props.supertitle.length > 0 ? <p/> : null }

        <h1>{ props.title }</h1>
        <p/>

        { props.subtitle.map(text => <h3>{ text }</h3>)}
        { props.subtitle.length > 0 ? <p/> : null }

        { props.content.map(contentItem => [
            formatContentItem(contentItem),
            <p/>
        ])}
    </div>
];