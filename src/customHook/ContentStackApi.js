'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

export default function useContentStackApi() {
  const [contentData, setContentData] = useState([]);
  
  useEffect(() => {
    // Dynamic import of the Contentstack library to avoid issues with SSR or deployment.
    const fetchData = async () => {
      try {
        const ContentStack = (await import('contentstack')).default;

        const Stack = ContentStack.Stack({
          api_key: "blt8cf7fa06f3654267",
          delivery_token: "cs11432c464beca575ef07a998",
          environment: "preview"
        });

        const Query = Stack.ContentType("pot_landing_page")
          .Entry("blta135005fa8d23ccf")
          .toJSON();

        const entry = await Query.fetch();
        
        console.log(entry["title"]);
        console.log("entry", entry);

        if (entry.components && entry.components.length > 0 && entry.components[0].teaser) {
          setContentData(entry.components[0].teaser.content);
        } else {
          setContentData(entry.components);
        }
      } catch (err) {
        console.error("Error fetching Contentstack data:", err);
      }
    };

    fetchData();
  }, []);

  return contentData;
}
