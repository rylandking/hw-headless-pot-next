
import axios from 'axios';
import { contactApi, detailsApi } from '../utils/ApiList/axiosapi.js'
import Home from './Home.js';
import { getLandingPage } from '../utils/contentstack/content'
import * as AnnotationsHelper from "../utils/contentstack/annotations";

function HomePage({ detailData, contactData, error, landingPageData }) {
    return (
        <div {...AnnotationsHelper.setObjectId(landingPageData._id)} suppressHydrationWarning>
            <Home detailData={detailData} contactData={contactData} error={error} landingPageData={landingPageData} />
        </div>
    );
}


export async function getServerSideProps() {

    const page = await getLandingPage();
    try {
        // const [detailsResponse, contactResponse] = await Promise.all([
        //     axios.get(detailsApi),
        //     axios.get(contactApi)
        // ]);

        const detailsResponse = { data: [] };
        const contactResponse = { data: [] };

        console.log('DETAIL DATA', detailsResponse.data)
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
