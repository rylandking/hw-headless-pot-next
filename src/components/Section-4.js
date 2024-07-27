import React from "react";
import useContentStackApi from "../customHook/ContentStackApi"; // Adjust the path accordingly
import "../utils/css/home.css";

const ImageGrid = () => {
    // Fetch data using the custom hook
    const contentData = useContentStackApi();

    // Filter out the image grid components from the fetched data
    const imageGridComponents = contentData.filter(component => component.imagegrid);

    if (!imageGridComponents || imageGridComponents.length === 0) {
        return <div>Loading...</div>; // or a loading spinner if you prefer
    }

    return (
        <div className="collage">
            {imageGridComponents[0].imagegrid.imagegrid_images.map((item, index) => {
                const image = item.imagegrid_image[0];
                const altText = item.alttext_for_imagegrid_image;

                return (
                    <img
                        key={index}
                        src={image.secure_url}
                        alt={altText}
                       // width={image.width}
                        //height={image.height}
                        className="collage-image"
                       // style={index === 3 ? { width: "66.6%" } : {}} // Adjust styling based on image position
                    />
                );
            })}
        </div>
    );
};

export default ImageGrid;
