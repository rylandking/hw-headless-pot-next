import '../styles/App.css';
import Layout from './Layout.js';

function MyApp({ Component, pageProps }) {
    return (
        <Layout detailData={pageProps.detailData} contactData={pageProps.contactData} error={pageProps.error}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

