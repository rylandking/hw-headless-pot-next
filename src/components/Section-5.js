import React from 'react';
import useContentStackApi from '../customHook/ContentStackApi'; // Adjust the path accordingly
import '../utils/css/home.css';

const ImageBanner = () => {
  // Fetch data using the custom hook
  const contentData = useContentStackApi();
  
  // Check if contentData is available and has imagebanner
  const imageBanner = contentData?.find((item) => item.imagebanner);

  // If the data isn't loaded yet, show a loading state
  if (!imageBanner) {
    return <div>Loading...</div>;
  }

  // Destructure necessary data from imageBanner
  const { title, imagebanner_image, eyebrow, description, reference_link,imageWidth,imageHeight } = imageBanner.imagebanner;
  const imageUrl = imagebanner_image[0]?.secure_url || '';

  return (
    <div className="ImageBanner" id="div-1">
      <div className="image-container" id="div-2">
        <div id="div-3">
          <div>
            <img
              src={imageUrl}
              alt={title}
              className="banner-image"
              //width={imageWidth}
              //height={imageHeight}
            />
          </div>
        </div>
      </div>

      <div className="text-container" id="div-4">
        <h2 id="h2-1">{eyebrow}</h2>
        <h2 id="h2-2">{title}</h2>
        <div id="div-5">
          <p id="p-1" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        <div className="cta">
          <a href={reference_link.href} target="_blank" rel="noopener noreferrer">
            {reference_link.title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;