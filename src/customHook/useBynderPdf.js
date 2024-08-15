import react from 'react';
import { getBynderPdf } from '../utils/ApiList/axiosapi.js';

function useBynderPdf() {
    const [bynderPdf, setBynderPdf] = react.useState([]);
    const [error, setError] = react.useState(null);

    react.useEffect(() => {
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