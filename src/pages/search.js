
//import '../utils/css/App.css';
import Search_Page from '../pages/Search-page'; 
import axios from 'axios';
import { detailsApi, contactApi } from '../utils/ApiList/axiosapi';

export default function SearchPage({ detailData, contactData, error }) {
    return (
           <Search_Page />
        
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
