'use client';
import ContentStack from 'contentstack';
import { useState ,useEffect} from "react";

export default function useContentStackApi() {
  const [contentData, setContentData] = useState([]);
  //Initialize the Contentstack Stack for react
  const Stack = ContentStack.Stack(
    "blt8cf7fa06f3654267",
    "cs11432c464beca575ef07a998",
    "preview"
  );
  //Get a Single Entry
 useEffect(() => {
  //const Query = Stack.ContentType("home_page")
  const Query = Stack.ContentType("pot_landing_page")
  //.Entry("bltb33c024768d87c22")
  .Entry("blta135005fa8d23ccf")
  .toJSON()
  .fetch()
  .then(
    function success(entry) {
      console.log(entry["title"]);
      console.log("entry", entry);
      setContentData(entry.components);
      //console.log("entry", entry.components[0].teaser.content);
      if (entry.components && entry.components.length > 0 && entry.components[0].teaser) {
        setContentData(entry.components[0].teaser.content);
      }

    },
    function error(err) {
      // err object
      console.log(err);
    }
  );
  }, []);
  return contentData;
}
