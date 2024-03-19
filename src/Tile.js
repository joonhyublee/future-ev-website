import React from 'react';
import AspectRatio from './AspectRatio';

export default props => (
    <div className="tile">
        <a href={ props.id }>
            <AspectRatio
                aspectRatio="4:3"
                style={{ marginBottom: 8 }}
            >
                <img src={ props.image }/>
            </AspectRatio>

            { props.showSupertitle ? <h4>{ props.supertitle }</h4> : null }
            <h3>{ props.title }</h3>
            { props.showSubtitle ? <h4>{ props.subtitle }</h4> : null }
            <p/>
        </a>
    </div>
);