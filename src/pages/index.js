//'use client';
import '../styles/App.css';
import MyApp from './_app.js';
//import { useEffect,useState } from "react";
import axios from 'axios';
import {contactApi, detailsApi} from '../utils/ApiList/axiosapi.js'
import Search_Page from './Search-page.js';
//import Layout from './Layout.js';
import {Route, RouterProvider, createRoutesFromElements,createBrowserRouter} from 'react-router-dom'
//import {Route, RouterProvider, createRoutesFromElements,createBrowserRouter} from 'next/router'
import Home from './Home.js';
import NotFound from '../components/NotFound.js';

function HomePage({ detailData, contactData, error }) {
    return (
        <div>
            <Home detailData={detailData} contactData={contactData} error={error} />
            
        </div>
    );
}

    
  /*return (
    <Layout detailData={detailData} contactData={contactData} error={error}>
      <Home />
    </Layout>
  );
}
  */

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
