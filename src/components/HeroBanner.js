import Image from 'next/image';
import useBuilder_io from "../customHook/useBuilder_io";

export default function HeroBanner(props) {
    const builderData = useBuilder_io();
    console.log("builder component Data ", builderData);

    // Access the data from builderData safely
    //const bannerImage = builderData?.data?.heroBanner?.bannerImage?.secure_url;
    //const bannerHeader = builderData?.data?.heroBanner?.bannerHeader;
    //const bannerText = builderData?.data?.heroBanner?.bannerText;

    const bannerImage = props?.bannerImage;
    const bannerHeader = props?.bannerHeader;
    const bannerText = props?.bannerText;

    //const bannerImage1 = props?.bannerImage;
    //console.log("bannerImage URL :", bannerImage1);
    console.log("bannerImage URL:", bannerImage);
    console.log("bannerHeader:", bannerHeader);
    console.log("bannerText:", bannerText);

    // Check if data is available
    if (!bannerImage || !bannerHeader || !bannerText) {
        console.error("HeroBanner data is missing:", builderData);
        return null;
    }

    return (
        <div className="hero-image">
          {bannerImage && (
            <img
              src={bannerImage}
              alt="Photographer"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <div className="bannertext">
            {bannerHeader && (
              <h1 className="header1" dangerouslySetInnerHTML={{ __html: bannerHeader }} />
            )}
            {bannerText && (
              <div className="text-white para" dangerouslySetInnerHTML={{ __html: bannerText }} />
            )}
          </div>
        </div>
      );
    }
