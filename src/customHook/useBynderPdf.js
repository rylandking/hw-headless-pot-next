import React, { useState, useEffect } from 'react';
import { getBynderPdf } from '../utils/ApiList/axiosapi.js';

function useBynderPdf() {
    const [bynderPdf, setBynderPdf] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await fetch(getBynderPdf);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data_result = await response.json();
                setBynderPdf(data_result);
            } catch (error) {
                setError(error);
            }
        };

        fetchPdf();
    }, []);

    return { bynderPdf, error };
}

export default useBynderPdf;