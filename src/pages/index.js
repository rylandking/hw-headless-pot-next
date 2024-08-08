
//import '../utils/css/App.css';
import axios from 'axios';
import {contactApi, detailsApi} from '../utils/ApiList/axiosapi.js'
//import {Route, RouterProvider, createRoutesFromElements,createBrowserRouter} from 'react-router-dom'
import {Route, RouterProvider, createRoutesFromElements,createBrowserRouter} from 'next/router'
import Home from './Home.js';
//import NotFound from '../components/NotFound.js';
import useApicall from '../customHook/useApicall.js';

//const {detailData, contactData, error} = useApicall();
//const { data, loading, error } = useApicall();

function HomePage() {
    const {detailData, contactData, error} = useApicall();
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
