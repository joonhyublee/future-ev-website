import React from 'react';

export default props => (
    <h2
        className="full-width"
        style={{
            paddingBottom: 13,
            borderBottom: '2px solid #333'
        }}
    >
        { props.label }
    </h2>
);