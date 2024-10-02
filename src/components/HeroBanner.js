
//import "../utils/css/home.css";
import Image from 'next/image';
import useContentStackApi from '../customHook/ContentStackApi'; // Adjust the path accordingly


export default function HeroBanner() {
    const contentData = useContentStackApi();
    
    // Find the hero banner data from the API response
    const heroBannerData = contentData.find(component => component.herobanner);

    if (!heroBannerData) {
        return null; // or a loading spinner if you prefer
    }

    const { banner_image, header, banner_text } = heroBannerData.herobanner;

    return (
        <>
            <div className="hero-image" data-sb-object-id="blta135005fa8d23ccf">
                <img 
                    src={banner_image[0].secure_url} 
                    alt="hero banner" data-sb-field-path="components.0.banner_image.0"
                   // style={{ width: "100%", height: "100%", objectFit: "cover" }}
                   //width={banner_image[0].width} 
                   //height={banner_image[0].height} 
                   />
                
                <div className="bannertext">
                    <h1 className="header1" data-sb-field-path="components.0.header" dangerouslySetInnerHTML={{ __html: header }} />
                    <p className="text-white para" data-sb-field-path="components.0.banner_text" dangerouslySetInnerHTML={{ __html: banner_text }} />
                </div>
            </div>
        </>
    );
}
/*export default function HeroBanner() {
    return (
       
        <>
        <div className="hero-image">
  <img src="https://honeywell.scene7.com/is/image/honeywell/street-view-buildings-2880x1440:5-2-hero" alt="Photographer" style={{"width":"100%", "height":"100%", "object-fit":"cover"}}/>
  <div className="bannertext">
           <h1 className="header1">
              <span className="text-red">A SAFER</span>
              <span className="text-red">MORE</span>
              <span className="text-red">CONFIDENT</span>
              <span className="text-white">WELCOME BACK.</span>
           </h1>
           <p className="text-white para">
              As we go back to work, back to travel and even back to play, let's
              also go forward. To embrace new opportunities. Together.
            </p>
           </div>
</div>
        </>
    );
}

*/
