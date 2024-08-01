import React, { useEffect, useState } from "react";
import axios from 'axios';
import Token from '../utils/ApiList/Token.js';
import { contactApi, detailsApi } from '../utils/ApiList/axiosapi.js';

export default function useApicall() {
  const [detailData, setDetailData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData1 = () => {
      axios.get(detailsApi)
        .then(response => {
          setDetailData(response.data);
          localStorage.setItem('Session_status', JSON.stringify(response.data.session_valid));
        })
        .catch(error => {
          console.error(error);
        });
    };

    const fetchData2 = () => {
      axios.get(contactApi)
        .then(response => {
          setContactData(response.data);
        })
        .catch(error => {
          console.error(error);
         // setError(error.response.data.session_valid);
        });
    };

    fetchData1();
    fetchData2();
  }, []);

  return { detailData, contactData, error };
}
