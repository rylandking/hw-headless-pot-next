import * as Contentstack from "contentstack";
import { getArticleByUrl, getPageBySlug } from "@/utils/contentstack/content";
import React from "react";

export default function Page(props) {
  return (
    <div style={{ margin: "64px" }}>
      <h1 style={{ margin: "32px" }}>{props.title}</h1>
      <div>{JSON.stringify(props.content)}</div>
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
