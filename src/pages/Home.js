import HeroBanner from "../components/HeroBanner";
import HomeSection2 from "../components/HomeSection2";
import HomeSectionMui from "../components/HomeSectionMui";
import ImageGrid from "../components/Section-4";
import ImageBanner from "../components/Section-5";
import useContentStackApi from "../customHook/ContentStackApi";
import { getComponent } from "../components/index";
import * as AnnotationsHelper from "../utils/contentstack/annotations";

export default function Home({ landingPageData }) {
  console.log('LANDING PAGE DATA', landingPageData);

  return (
    <>
      <div>
        {landingPageData.components.map((component, index) => {
          console.log('COMPONENT', component.type)
          const SectionElement = getComponent(component);

          if (!SectionElement) {
            return null;
          }

          return (<SectionElement {...AnnotationsHelper.setFieldPath(`.components.${index}`)} key={`${component.type}-${index}`} {...component} />);
        })}
      </div>
    </>
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
