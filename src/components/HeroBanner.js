import Image from 'next/image';
import useBuilder_io from "../customHook/useBuilder_io";

export default function HeroBanner() {
    const builderData = useBuilder_io();
    console.log("builderData", builderData);

    // Access the data from builderData safely
    const bannerImage = builderData?.data?.heroBanner?.bannerImage?.secure_url;
    const bannerHeader = builderData?.data?.heroBanner?.bannerHeader;
    const bannerText = builderData?.data?.heroBanner?.bannerText;
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
