import React from 'react';
import AspectRatio from './AspectRatio';
import { doAllItemsSatisfy, formatContentItem } from './utils';

// publication panel for each publication
// assumes that first content is citation text
// and second content is link to PDF
export default props => [
    <AspectRatio
        className="thumbnail-big"
        aspectRatio="4:3"
    >
        <a href={ props.id }>
            <img src={ props.image }/>
        </a>
    </AspectRatio>,

    <div className="thumbnail-big-content">
        <h4>{ props.supertitle }</h4>

        <h3>
            <a href={ props.id }>
                { props.citation.split('_')[0] }
                <i>{ props.citation.split('_')[1] }</i>
                { props.citation.split('_')[2] }
            </a>
        </h3>

        { props.content[0].hasOwnProperty('link')
            ? formatContentItem(props.content[0])
            : Array.isArray(props.content[0]) && doAllItemsSatisfy(props.content[0],
                item => item.hasOwnProperty('link'))
                ? formatContentItem(props.content[0])
                : null
        }
    </div>
];