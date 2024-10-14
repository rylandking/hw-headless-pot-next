import { getComponent } from "../components/index";
import * as AnnotationsHelper from "../utils/contentstack/annotations";

export default function Home({ landingPageData }) {
  return (
    <>
      <div>
        {landingPageData.components.map((component, index) => {
          const SectionElement = getComponent(component);

          if (!SectionElement) {
            return null;
          }

          return (<SectionElement {...AnnotationsHelper.setFieldPath(`.components.${index}`)} key={`${component.type}-${index}`} {...component} suppressHydrationWarning />);
        })}
      </div>
    </>
  );
}
