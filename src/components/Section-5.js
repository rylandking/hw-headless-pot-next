import React from 'react';
//import useContentStackApi from '../customHook/ContentStackApi'; 
import useBuilder_io from "../customHook/useBuilder_io";

const ImageBanner = (props) => {
  // Fetch data using the custom hook
  const builderData = useBuilder_io();
  
  // Check if builderData is available and contains imageBanner data
  //const imageBanner = builderData?.data?.imageBanner;
  const imageBanner = props;

  // Log the imageBanner object to debug
  console.log("ImageBanner Data:", imageBanner);

  // If the data isn't loaded yet, show a loading state
  if (!imageBanner) {
    return <div>Loading...</div>;
  }

  const {
    eyebrow = '',
    description = '',
    imageBannerImage = {},
    title = '',
    referenceLink = {}
  } = imageBanner;

  const imageUrl = imageBannerImage || '';

  return (

    <div className="ImageBanner" id="div-1">

      <div className="image-container" id="div-2">
        <div id="div-3">
          <div>
            <img src={imageUrl} alt={title} className="banner-image" width='auto' height='auto' />
          </div>
        </div>
      </div>

      <div className="text-container" id="div-4">
        <h2 id="h2-1">{eyebrow}</h2>
        <h2 id="h2-2">{title}</h2>
        <div id="div-5">
            <div id="p-1" dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
        <div className="cta">
         <a href={referenceLink.url} target="_blank" rel="noopener noreferrer">
                {referenceLink.title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
