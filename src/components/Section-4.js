import React from "react";
import * as AnnotationsHelper from "../utils/contentstack/annotations";
// import Image from "next/image";
import useContentStackApi from "../customHook/ContentStackApi"; // Adjust the path accordingly
//import "../utils/css/home.css";

const ImageGrid = (props) => {
    return (
        <div className="collage" {...props}>
            {props.imagegrid_images.map((item, index) => {
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
                        {...AnnotationsHelper.setFieldPath(`.imagegrid_images.${index}.imagegrid_image.0`)}
                    />
                );
            })}
        </div>
    );
};

export default ImageGrid;
