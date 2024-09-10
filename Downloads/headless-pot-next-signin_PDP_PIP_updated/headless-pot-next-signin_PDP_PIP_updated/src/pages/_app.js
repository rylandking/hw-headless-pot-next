import '../utils/css/app.css';
import '../utils/css/Breadcrumb.css';
import '../utils/css/CardSection3.css';
import '../utils/css/dropdownmodel.css';
import '../utils/css/home.css';
import '../utils/css/NotFound.css';
import '../utils/css/index.css';
import '../utils/css/pdp.css';
import '../utils/css/ProductSection.css';
import '../utils/css/SearchBarB.css';
import '../utils/css/SearchBarW.css';
import '../utils/css/soldToDropdown.css';
import '../utils/css/Testingdrop.css';
import Layout from './Layout.js';
import '../utils/css/pip.css';
//import '../utils/css/NavBars.css';
import Head from 'next/head';
import 'normalize.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout detailData={pageProps.detailData} contactData={pageProps.contactData} error={pageProps.error}>
             <Head>
        <title>Honeywell Building Automation</title> {/* This will be used if no title is set on individual pages */}
      </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

