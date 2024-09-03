import React from 'react';
import useContentStackApi from '../customHook/ContentStackApi'; // Adjust the path accordingly
//import "../utils/css/home.css";
import useBuilder_io from "../customHook/useBuilder_io";

export default function HomeSection2() {
    const contentData = useContentStackApi();
    const builderData = useBuilder_io();

    // Filter out the section component from the fetched data
    const sectionComponent = contentData.find(component => component.section);
    //const sectionComponent = builderData.find(component => component.section);
    if (!sectionComponent) {
       return <div>Loading...</div>; // or a loading spinner if you prefer
    }
    const header1 = builderData?.data?.section?.header;
    const ctaButtons = builderData?.data?.section?.ctaButtons;
    console.log("header1",header1);
    console.log("ctaButtons",ctaButtons);

   // const bannerHeader = builderData?.data?.heroBanner?.bannerHeader;
    const { header, cta_buttons } = sectionComponent.section;

    return (
        <div className="homesection2">
            <div className="container">
                <div className="header" dangerouslySetInnerHTML={{ __html: header1 }}></div>
                <div className="footer">
                    {ctaButtons.map((button, index) => (
                        <a 
                            key={index} 
                            href={button.button.url} 
                            className="button-primary"
                        >
                            {button.button.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

/*


export default function HomeSection2() {
    return (
        <div className="homesection2">
            <div className="container">
            <div className="header">
           <h3>Healthier buildings mean more confident occupants</h3>
            <h5>Now’s the time to start making your building healthier. 
                Draw on our building control expertise to address the key concerns—air quality,
                 touchless systems and social distance monitoring. We’ll make a healthy building operational faster than you thought possible.</h5>
           </div>
            <div className="footer">
                <button className="button-primary">SPEAK TO AN EXPERT</button>
                <button className="button-primary">SEE HEALTHY BUILDINGS</button>
                <button className="button-primary">VIEW ALL PRODUCTS</button>
            </div>
            </div>
           
        </div>
    );
}
    */
