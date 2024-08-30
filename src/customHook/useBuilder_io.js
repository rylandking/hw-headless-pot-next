'use client';
import { useState, useEffect } from 'react';
import { builder } from "@builder.io/react";
builder.init("129b06a063e849a4965f7afd112e1a46");
export default function useBuilder_io() {
  const [builderData, setBuilderData] = useState([]);


  useEffect(() => {
    async function fetchContent() {
      const builderIOData = await builder.get("home-page-data-model", {
        //userAttributes : { urlPath : "/"}
        query: {
         name : "Honeywell Landing Page Nex"
        },
        //options: { enrich: true }
        // You can use options for queries, sorting, and targeting here
        // https://github.com/BuilderIO/builder/blob/main/packages/core/docs/interfaces/GetContentOptions.md
      });
      setBuilderData(builderIOData);
    }
    fetchContent();
  }, []);
console.log('builderData from api',builderData)
  return builderData;
}
