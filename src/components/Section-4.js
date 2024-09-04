import React from "react";
import useBuilder_io from "../customHook/useBuilder_io";

const ImageGrid = (props) => {
    const builderData = useBuilder_io();

    // Log the raw data fetched by useBuilder_io
    console.log("Builder Data:", builderData);

   
    if (!builderData || !builderData.data || !builderData.data.imageGridObject) {
        console.log("Loading or No Data Available");
        return <div>Loading...</div>; // or a loading spinner if you prefer
    }

    // Safely access image grid components using chaining methods
    //const imageGridComponents = builderData.data.imageGridObject
    const imageGridComponents = props?.imageGridObject?.flatMap(grid => {
            console.log("Grid Object:", grid);
            return grid.imageobject || [];
        }).filter(item => {
            console.log("Image Object (before filter):", item);
            return item.image; // Filter out items without an image
        }).map(item => {
            const processedItem = {
                src: item.image,
                alt: item.alttext || '',
                className: item.className || ''
            };
            console.log("Processed Image Item:", processedItem);
            return processedItem;
        });

    // Log the final array of image components
    console.log("Image Grid Components:", imageGridComponents);

    if (imageGridComponents?.length === 0) {
        console.log("No images available");
        return <div>No images available</div>; 
    }

    return (
        <div className="collage">
            {imageGridComponents?.map((item, index) => {
                console.log(`Rendering Image ${index + 1}:`, item);
                return (
                    <img
                        key={index}
                        src={item.src}
                        alt={item.alt}
                        className={`collage-image ${item.className}`} 
                        
                    />
                );
            })}
        </div>
    );
};

export default ImageGrid;
