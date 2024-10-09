import * as Contentstack from "contentstack";
import { getArticleByUrl, getPageBySlug } from "@/utils/contentstack/content";
import React from "react";

export default function Page(props) {
  return (
    <div style={{ margin: "64px" }}>
      <h1 style={{ marginBottom: "32px" }}>{props.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: props.content?.children
            ?.map(
              (part) =>
                `<${part.type}>${part.children?.[0]?.text}</${part.type}>`
            )
            .join("\n"),
        }}
      ></div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const page = await getArticleByUrl("/" + context.params.page.join("/"));
  console.log(page);
  return {
    props: {
      title: page.title,
      content: page.content,
    },
  };
}
