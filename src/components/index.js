import HeroBanner from "./HeroBanner";
import HomeSection2 from "./HomeSection2";
import ImageGrid from "../components/Section-4";
import ImageBanner from "../components/Section-5";

const sectionsMapping = {
    'herobanner': HeroBanner,
    'section': HomeSection2,
    'imagegrid': ImageGrid,
    'imagebanner': ImageBanner
};

export function getComponent(section) {
    return sectionsMapping[section.type];
}