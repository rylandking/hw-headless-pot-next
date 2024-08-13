
//import '../utils/css/App.css';
import axios from 'axios';
import {contactApi, detailsApi} from '../utils/ApiList/axiosapi.js'
//import {Route, RouterProvider, createRoutesFromElements,createBrowserRouter} from 'react-router-dom'
import {Route, RouterProvider, createRoutesFromElements,createBrowserRouter} from 'next/router'
import Home from './Home.js';
//import NotFound from '../components/NotFound.js';
import useApicall from '../customHook/useApicall.js';
import { useEffect } from 'react';
//const {detailData, contactData, error} = useApicall();
//const { data, loading, error } = useApicall();

function HomePage() {
    const {detailData, contactData, error} = useApicall();

    useEffect(() => {

        fetch('https://integration.richrelevance.com/rrserver/p13n_generated.js?a=a6730ec97b0c48d4&ts=1722357989222&v=1.2.6.20240524&ssl=t&atcid=%7CMN7510A2001%2FU&pt=%7Cadd_to_cart_page.rr1&u=0035a00003REfJrAAL&s=Z0hyQeOQYcghEO1oSvAx1722357851877&sgs=%7C0000187444%3AUniversal%20Supply%20Group%20Inc&cts=https%3A%2F%2Fqpublish-hbt.aws.aem.honeywell.com%2Fshop%2Fhoneywell%2Fen%2F&rid=1017-10~1107-10~1192-10~1265-13~1475-10~265H-10~265N-10~461G-10~USD&pref=https%3A%2F%2Fqpublish-hbt.aws.aem.honeywell.com%2Fus%2Fen%2Fsearch-results%3FdocType%3DSku%26search%3DMN7510A2001%252FU&rcs=eF5jYSlN9kg0tDQwMkg20DUwtTDRNTFKNNFNSkw10U01NzMxNjdPTTEwMOXKLSvJTBEwtDA30zXUNQQAhBYNyg&l=1')
        .then(response => response.text())
        .then(data_result => console.log(JSON.stringify(data_result)))
    
       
      }, []);
    
    return (
        <div>
            <Home detailData={detailData} contactData={contactData} error={error} />
            
        </div>
    );
}


export async function getServerSideProps() {
  try {
      const [detailsResponse, contactResponse] = await Promise.all([
          axios.get(detailsApi),
          axios.get(contactApi)
      ]);

      return {
          props: {
             detailData: detailsResponse.data,
              contactData: contactResponse.data,
              error: null
          }
      };
  } catch (error) {
      return {
          props: {
              detailData: [],
             contactData: [],
              error: error.message || 'Error fetching data'
          }
      };
  }
}

export default HomePage;
