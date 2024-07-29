import React from 'react';
import axios from 'axios';
import Token from '../utils/ApiList/Token.js';
import {detailsApi} from '../utils/ApiList/axiosapi.js'

//const [detailData, setDetailData] = useState([]);

console.log(Token,detailsApi)
/*useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get( `${detailsApi}`,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      console.log(response.data);
      setDetailData(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
*/