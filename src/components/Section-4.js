import React from "react";
import * as AnnotationsHelper from "../utils/contentstack/annotations";
// import Image from "next/image";
import useContentStackApi from "../customHook/ContentStackApi"; // Adjust the path accordingly
//import "../utils/css/home.css";

const ImageGrid = (props) => {
    // Fetch data using the custom hook
    const contentData = useContentStackApi();

    // Filter out the image grid components from the fetched data
    const imageGridComponents = contentData.filter(component => component.imagegrid);

    if (!imageGridComponents || imageGridComponents.length === 0) {
        return <div>Loading...</div>; // or a loading spinner if you prefer
    }

    return (
        <div className="collage" data-sb-field-path={props.fieldPath}>
            {imageGridComponents[0].imagegrid.imagegrid_images.map((item, index) => {
                const image = item.imagegrid_image[0];
                console.log(image);
                const altText = item.alttext_for_imagegrid_image;

                return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={index}
                        src={image.secure_url}
                        alt={altText}
                        className="collage-image"
                        data-sb-field-path=".imagegrid_images.0.imagegrid_image.0"
                       // style={index === 3 ? { width: "66.6%" } : {}} // Adjust styling based on image position
                    />
                );
            })}
        </div>
    );
};

export default ImageGrid;
