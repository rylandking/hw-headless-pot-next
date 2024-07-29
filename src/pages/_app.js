import '../utils/css/App.css';
import '../utils/css/Breadcrumb.css';
import '../utils/css/CardSection3.css';
import '../utils/css/dropdownmodel.css';
import '../utils/css/home.css';
import '../utils/css/NotFound.css';
import '../utils/css/index.css';
import '../utils/css/pdp.css';
import '../utils/css/ProductSection.css';
import '../utils/css/searchBarB.css';
import '../utils/css/searchBarW.css';
import '../utils/css/soldToDropdown.css';
import '../utils/css/Testingdrop.css';
import Layout from './Layout.js';

function MyApp({ Component, pageProps }) {
    return (
        <Layout detailData={pageProps.detailData} contactData={pageProps.contactData} error={pageProps.error}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

