import HeroBanner from "../components/HeroBanner";
import HomeSection2 from "../components/HomeSection2";
import ImageGrid from "../components/Section-4";
import ImageBanner from "../components/Section-5";
import useContentStackApi from "../customHook/ContentStackApi";

export default function Home() {
  const data = useContentStackApi();
  console.log("contenapidatahook", data);
  if (!data) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  const componentMap = {
    herobanner: HeroBanner,
    section: HomeSection2,
    imagegrid: ImageGrid,
    imagebanner: ImageBanner,
  };

  return (
    <div data-sb-object-id="blta135005fa8d23ccf">
      {data?.map((section, idx) => {
        const type = Object.keys(section)[0];
        const Component = componentMap[type];
        console.log("Component", Component);
        return <Component key={idx} fieldPath={`components.${idx}`} />;
      })}
    </div>
  );
}
/*return (
    <>
      <HeroBanner></HeroBanner>
      <HomeSection2></HomeSection2>
      <HomeSectionMui></HomeSectionMui>
      <ImageGrid></ImageGrid>
      <ImageBanner></ImageBanner>
    </>
  );
}
  */

/*
import React from "react";
//import React from "react";

import "../utils/css/home.css";
import HeroBanner from "../components/HeroBanner";
import HomeSection2 from "../components/HomeSection2";
//import HomeSection3 from "../components/HomeSection3";
import { useEffect,useState } from "react";
import ApiList from "../AxiosApiList/ApiList";

import HomeSectionMui from "../components/HomeSectionMui";

import axios from "axios";
import Token from "../utils/ApiList/Token";
export default function Home() {
 
  console.log(Token,detailsApi)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( `${detailsApi}`,
          {
            headers: {
              Authorization: Token,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
   <>
   <h1>HeroBanner</h1>
   <HeroBanner></HeroBanner>
   <HomeSection2></HomeSection2>
   <HomeSectionMui></HomeSectionMui>
   </>
  );
}

*/
