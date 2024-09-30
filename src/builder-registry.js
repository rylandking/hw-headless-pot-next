import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(
  dynamic(() => import("./components/HeroBanner")),
  {
    name: "CustomHeroBanner",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/HomeSection2")),
  {
    name: "Custom_HomeSection2",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/Section-4")),
  {
    name: "Custom_ImageGrid",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/Section-5")),
  {
    name: "Custom_ImageBanner",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/HomeSectionMui")),
  {
    name: "CardSection3",
  }
);
