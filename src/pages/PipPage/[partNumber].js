import { useRouter } from 'next/router';
import Pip from '../../components/pip';
import { getAvailability, getPriceDetail, getProductDetail } from '../../utils/ApiList/axiosapi';
//import NotFound from '../../components/NotFound';
import usePdpApiCall from '../../customHook/usePdpApiCall';

const PipPage = () => {
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

export default PipPage;
