import React from 'react';
import AspectRatio from './AspectRatio';

export default props => [
    <AspectRatio className="thumbnail-small" aspectRatio="4:3">
        <a href={ props.id }>
            <img src={ props.image }/>
        </a>
    </AspectRatio>,

    <div className="thumbnail-small-content">
        <a className="" href={ props.id }>
            <h4>{ props.supertitle }</h4>
            <h3>{ props.title }</h3>
            <h4>{ props.subtitle.map(item => {
                const isLastItem = item === props.subtitle[props.subtitle.
                    length - 1];
                const isSecondToLastItem = item === props.subtitle[props.
                    subtitle.length - 2];
                item = props.options.bolden === item ? <b>{ item }</b> : item;

                // e.g. Joon Hyub Lee
                if (props.subtitle.length < 2) {
                    return item;
                } else {
                    // e.g. Joon Hyub Lee and Seok-Hyung Bae
                    if (props.subtitle.length == 2) {
                        if (isLastItem) {
                            return item;
                        } else {
                            return [item, ' and '];
                        }
                    // e.g. Donghyeok Ma, Joon Hyub Lee, and Seok-Hyung Bae
                    } else {
                        if (isLastItem) {
                            return item;
                        } else if (isSecondToLastItem) {
                            return [item, ', and '];
                        } else {
                            return [item, ', '];
                        }
                    }
                }
            })}</h4>
        </a>
    </div>
];