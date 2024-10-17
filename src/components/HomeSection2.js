import React from 'react';
import useContentStackApi from '../customHook/ContentStackApi'; // Adjust the path accordingly
//import "../utils/css/home.css";

export default function HomeSection2(props) {
    const contentData = useContentStackApi();

    // Filter out the section component from the fetched data
    const sectionComponent = contentData.find(component => component.section);

    if (!sectionComponent) {
        return <div>Loading...</div>; // or a loading spinner if you prefer
    }

    const { header, cta_buttons } = sectionComponent.section;

export default function HomeSection2(props) {
    return (
        <div className="homesection2" data-sb-field-path={props.fieldPath}>
            <div className="container">
                <div className="header" data-sb-field-path=".header" dangerouslySetInnerHTML={{ __html: header }}></div>
                <div className="footer">
                    {props.cta_buttons.map((button, index) => (
                        <a
                            key={index}
                            href={button.button_link.href}
                            className="button-primary"
                            data-sb-field-path=".cta_buttons.0.button_link.title"
                        >
                            <span {...AnnotationsHelper.setFieldPath('.button_link.title')}>{button.button_link.title}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}