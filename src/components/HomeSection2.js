import React from 'react';
import * as AnnotationsHelper from "../utils/contentstack/annotations";

export default function HomeSection2(props) {
    return (
        <div className="homesection2" {...props}>
            <div className="container">
                <div className="header" {...AnnotationsHelper.setFieldPath('.header')} dangerouslySetInnerHTML={{ __html: props.header }}></div>
                <div className="footer">
                    {props.cta_buttons.map((button, index) => (
                        <a
                            key={index}
                            href={button.button_link.href}
                            className="button-primary"
                            {...AnnotationsHelper.setFieldPath(`cta_buttons.${index}`)}
                        >
                            <span {...AnnotationsHelper.setFieldPath('.button_link.title')}>{button.button_link.title}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}