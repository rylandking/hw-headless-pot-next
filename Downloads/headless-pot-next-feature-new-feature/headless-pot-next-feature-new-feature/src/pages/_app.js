import '../utils/css/App.css';
import '../utils/css/Breadcrumb.css';
import '../utils/css/CardSection3.css';
import '../utils/css/dropdownmodel.css';
import '../utils/css/home.css';
import '../utils/css/NotFound.css';
//import '../utils/css/index.css';
import '../styles/pdp.css';
import '../utils/css/ProductSection.css';
//import '../utils/css/SearchBarB.css';
//import '../utils/css/SearchBarW.css';
import '../styles/SearchBarB.css';
import '../styles/SearchBarW.css';
import '../utils/css/soldToDropdown.css';
import '../utils/css/Testingdrop.css';
import Layout from './Layout.js';
import '../utils/css/pip.css';
//import '../utils/css/NavBars.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout detailData={pageProps.detailData} contactData={pageProps.contactData} error={pageProps.error}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

