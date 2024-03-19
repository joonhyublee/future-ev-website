import React from 'react';

export default props => (
    <div
        className={ props.className }
        style={ props.style }
    >
        <div
            className="aspect-ratio"
            style={{
                // e.g.
                // aspectRatio="16:9"
                // aspectRatio="4:3"
                paddingBottom: (
                    100 *
                    parseFloat(props.aspectRatio.split(':')[1]) /
                    parseFloat(props.aspectRatio.split(':')[0])
                ) + '%'
            }}
        >
            { props.children }
        </div>
    </div>
);