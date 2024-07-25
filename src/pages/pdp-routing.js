import Layout from '../pages/Layout';
import '../styles/App.css';
import MyApp from './_app.js';
import Search_Page from '../pages/Search-page'; 
import Pdp from '..components/pdp';
import axios from 'axios';
import Home from './Home.js';
import { detailsApi, contactApi } from '../utils/ApiList/axiosapi';

export default function PDPPage({ detailData, contactData, error }) {
    return (
           <Pdp />
        
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