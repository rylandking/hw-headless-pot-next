import { useRouter } from "next/router";

import Pdp_BEAMKHKR from "@/components/pdp_BEAMHKR";
import Pdp_XAL from "@/components/pdp_XAL";
import Pdp_NX1MPS from "@/components/pdp_NX1MPS";
import Pdp from "@/components/pdp";



const PdpDetail = () => {
    const router = useRouter();
  const { pdp_detail } = router.query;
    return(
        <>
        {pdp_detail === "BEAMHK" && <Pdp /> }
        {pdp_detail === "BEAMHKR" && <Pdp_BEAMKHKR />}
        {pdp_detail === "XAL-53" && <Pdp_XAL />}
        {pdp_detail === "NX1MPS" && <Pdp_NX1MPS />}
        </>

    )
}
export default PdpDetail;