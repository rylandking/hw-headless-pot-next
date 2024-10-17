import React from 'react';
//import {Outlet} from 'react-router-dom';
import Header from "../components/NavBars";
import Footer from "../components/Footer";


export default function Layout({ children, detailData, contactData, error }) {

    return (
        <>
            <Header detailData={detailData} contactData={contactData} error={error} />
            <main>{children}</main>
            <Footer />
        </>
    );
}