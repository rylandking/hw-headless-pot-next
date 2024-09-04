import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(
  dynamic(() => import("./components/Counter/Counter")),
  {
    name: "Counter",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/HeroBanner")),
  {
    name: "HeroBanner",
    inputs: [
      { name: "bannerImage", type: "string" },
      { name: "bannerHeader", type: "richText" },
      { name: "bannerText", type: "richText" },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/HomeSection2")),
  {
    name: "HomeSection",
    inputs: [
      { name: "header", type: "richText" },
      {
        name: "ctaButtons",
        type: "list",
        subFields: [
          {
            name: "button",
            type: "object",
            subFields: [
              {
                name: "title",
                type: "string",
              },
              {
                name: "url",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/Section-4")),
  {
    name: "ImageGrid",
    inputs: [
      {
        name: "imageGridObject",
        type: "list",
        subFields: [
          {
            name: "imageobject",
            type: "object",
            subFields: [
              {
                name: "image",
                type: "string",
              },
              {
                name: "alttext",
                type: "string",
              },
              {
                name: "className",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/Section-5")),
  {
    name: "ImageBanner",
    inputs: [
      { name: "title", type: "string" },
      { name: "imageBannerImage", type: "string" },
      { name: "eyebrow", type: "String" },
      { name: "description", type: "richText" },
      { name: "referenceLink", type: "object",
        subFields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "url",
            type: "string",
          },
        ],
      },
    ],
  }
);
