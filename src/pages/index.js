
//import '../utils/css/App.css';
import axios from 'axios';
import { contactApi, detailsApi } from '../utils/ApiList/axiosapi.js'
//import {Route, RouterProvider, createRoutesFromElements,createBrowserRouter} from 'react-router-dom'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'next/router'
import Home from './Home.js';
import { getLandingPage } from '../utils/contentstack/content'
import * as AnnotationsHelper from "../utils/contentstack/annotations";
//import NotFound from '../components/NotFound.js';

function HomePage({ detailData, contactData, error, landingPageData }) {
    return (
        <div {...AnnotationsHelper.setObjectId(landingPageData._id)}>
            <Home detailData={detailData} contactData={contactData} error={error} landingPageData={landingPageData} />

        </div>
    );
}


export async function getServerSideProps() {

    const page = await getLandingPage();
    try {
        const [detailsResponse, contactResponse] = await Promise.all([
            axios.get(detailsApi),
            axios.get(contactApi)
        ]);

        return {
            props: {
                detailData: detailsResponse.data,
                contactData: contactResponse.data,
                landingPageData: page,
                error: null
            }
        };
    } catch (error) {
        return {
            props: {
                detailData: [],
                contactData: [],
                landingPageData: page,
                error: error.message || 'Error fetching data'
            }
        };
    }
}

export default HomePage;
