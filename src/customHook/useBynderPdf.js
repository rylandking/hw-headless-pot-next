import React, { useState, useEffect } from 'react';
import { getBynderPdf } from '../utils/ApiList/axiosapi.js';

function useBynderPdf() {
    const [bynderPdf, setBynderPdf] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            fetch(getBynderPdf)
            .then(response => response.json())
            .then(data_result => setBynderPdf(data_result))
        } catch (error) {
            setError(error);
        }
    }, []);

    return { bynderPdf, error };
}

export default useBynderPdf;