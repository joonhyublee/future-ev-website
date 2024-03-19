import React from 'react';

const style = {
    container: {
        display: 'flex',
        flexWrap: 'wrap-reverse',
        alignItems: 'flex-start',
        borderBottom: '2px solid #333',
        paddingTop: 13,
        paddingBottom: 13

    },

    logoContainer: {
        paddingBottom: 7
    },

    logoImg: {
        height: 40,
        border: "none"
    },

    menuContainer: {
        marginTop: 5,
        flexGrow: 1
    },

    selected: { color: '#00f' }
};

const menuLabels = ['회사소개', 'CEO 인사말', '회사연혁', '제품', 'NAVER Café'];

const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default props => (
    <div className="full-width" style={ style.container }>
        <div style={ style.menuContainer }>
            { menuLabels.map(menuLabel =>
                <h2 className="menu-label">
                    <a
                        href={ `/${ menuLabel }` }
                        style={ props.selected == menuLabel ? style.selected : {} }
                    >
                        { capitalize(menuLabel) }
                    </a>
                </h2>
            )}
        </div>

        <a href="/">
            <div style={ style.logoContainer }>
                <img src="/images/logo.png" style={ style.logoImg }></img>
            </div>
        </a>
    </div>
);