import { useRouter } from 'next/router';
import Pip from '../../components/pip';
import { detailsApi, contactApi ,getAvailability, getPriceDetail, getProductDetail } from '../../utils/ApiList/axiosapi';
//import NotFound from '../../components/NotFound';
import usePdpApiCall from '../../customHook/usePdpApiCall';
import axios from 'axios';
//import { detailsApi, contactApi } from '../utils/ApiList/axiosapi';

//const PipPage = () => {
  export default function PipPage({ detailData, contactData, error }) {
  const router = useRouter();
  const { partNumber } = router.query;

  //if (!partNumber) {
    //return <NotFound error="Product not found, check the path" />;
  //}

  console.log('partNumber', partNumber);

  const pdpData = usePdpApiCall(getProductDetail, partNumber);
  const priceData = usePdpApiCall(getPriceDetail, partNumber);
  const getAvail = usePdpApiCall(getAvailability, partNumber);

  console.log('data from PipPage', pdpData);

  return (
    <>
      <Pip data={pdpData} price={priceData} avail={getAvail} product_no={partNumber} />
    </>
  );
};

//export default PipPage;
export async function getServerSideProps() {
  try {
      const [detailsResponse, contactResponse] = await Promise.all([
          axios.get(detailsApi),
          axios.get(contactApi)
      ]);

      return {
          props: {
              detailData: detailsResponse.data,
              contactData: contactResponse.data,
              error: null
          }
      };
  } catch (error) {
      return {
          props: {
              detailData: [],
              contactData: [],
              error: error.message || 'Error fetching data'
          }
      };
  }
}

