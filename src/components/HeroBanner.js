/* eslint-disable @next/next/no-img-element */

//import "../utils/css/home.css";
import Image from 'next/image';
import useContentStackApi from '../customHook/ContentStackApi'; // Adjust the path accordingly


export default function HeroBanner(props) {
    const contentData = useContentStackApi();
    
    // Find the hero banner data from the API response
    const heroBannerData = contentData.find(component => component.herobanner);

    if (!heroBannerData) {
        return null; // or a loading spinner if you prefer
    }

    const { banner_image, header, banner_text } = heroBannerData.herobanner;

export default function HeroBanner(props) {
    return (
        <>
            <div className="hero-image" data-sb-field-path={props.fieldPath}>
                <img 
                    src={banner_image[0].secure_url} 
                    alt="hero banner" data-sb-field-path=".banner_image.0"
                   // style={{ width: "100%", height: "100%", objectFit: "cover" }}
                   //width={banner_image[0].width} 
                   //height={banner_image[0].height} 
                   />
                
                <div className="bannertext">
                    <h1 className="header1" data-sb-field-path=".header" dangerouslySetInnerHTML={{ __html: header }} />
                    <p className="text-white para" data-sb-field-path=".banner_text" dangerouslySetInnerHTML={{ __html: banner_text }} />
                </div>
            </div>
        </div>
    );
}