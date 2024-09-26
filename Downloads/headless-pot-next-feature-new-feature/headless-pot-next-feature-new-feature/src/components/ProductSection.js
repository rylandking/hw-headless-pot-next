import { useState, useEffect } from "react";
import CaratDown from "../utils/icons/caratdown.svg";
import CaratUp from "../utils/icons/caratup.svg";
//import '../utils/css/ProductSection.css';
import Image from "next/image";
import Link from "next/link";
import usePdpApiCall from "../customHook/usePdpApiCall";
import {
  getProductDetail,
  getPriceDetail,
  getAvailability,
} from "../utils/ApiList/axiosapi";

const ProductSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

      setUserLoggedIn(isLoggedIn); // Ensure it's explicitly checked for the string "true"
    }
  }, []);
  console.log("status:", userLoggedIn);

  const PdpPageCall = (partNumber) => {
    console.log(partNumber);
  };
  const products = [
    {
      id: 1,
      partNumber: "BEAMHK",
      description: "Heater kit for Beam detector",
    },
    {
      id: 2,
      partNumber: "BEAMHKR",
      description:
        "Heating Kit: 15 to 32V: 450mA: For Reflector of Reflected Beam Smoke Detectors",
    },
    {
      id: 3,
      partNumber: "NX1MPS",
      description:
        "Security Control Panel: 1 Door: Metal Enclosure: 4A Power Supply and 12V: 7 AH Battery Backup",
    },
    {
      id: 4,
      partNumber: "XAL-53",
      description: "Hazardous Location Pull Station: N/O and N/C Contacts",
    },
    {
      id: 5,
      partNumber: "GW72224",
      description: "Prism for reflective beam type smoke detector",
    },
    {
      id: 6,
      partNumber: "HBOC_RMTRES_CP",
      description:
        "HBOC 24/7 365 Remote Response provides a call triage facility priced by site for responding to unlimited incoming break / fix calls from end user sites for 12 months.",
    },
    {
      id: 7,
      partNumber: "V5011E1237",
      description:
        "V5011E1237 Linear valve: Nominal pressure rating PN16: Flow Capacity 25kVS m3/h: Valve Size DN 40",
    },
    {
      id: 8,
      partNumber: "TK_C21P",
      description:
        "Temaline LonWorks digital I/O module. To be connected to TS_AC01 or TS2.",
    },
    {
      id: 9,
      partNumber: "N1MSTRT10",
      description: "Metal Single Door Starter Kit: For NetAXS-123",
    },
    { id: 10, partNumber: "HUPAM", description: "HID PAM M2000 W/ENCL" },
    {
      id: 11,
      partNumber: "IGSMVCN4G",
      description:
        "Internet and GSM Communicator: 2-way Voice Transport Capability: ULC listed",
    },
    {
      id: 12,
      partNumber: "N1MSTRT40",
      description: "Metal Single Door Starter Kit: For NetAXS-123",
    },
    {
      id: 13,
      partNumber: "PW7K1R1",
      description:
        "PW7000 Intelligent Controller: 2 On-board Input: 2 On-board Output",
    },
    {
      id: 14,
      partNumber: "NXPS",
      description: "NetAXS-123 Power Supply: 12V DC: 4A",
    },
    {
      id: 15,
      partNumber: "IGSMV4G",
      description:
        "Internet and GSM Communicator: Two-Way Voice Transport Capability",
    },
    {
      id: 16,
      partNumber: "IGSMCFP4G",
      description: "Internet and 4G Commercial Fire Communicator",
    },
    {
      id: 17,
      partNumber: "HNMBMBDX10SLQ",
      description: "Motherboard-Hhxe16C1608T",
    },
    {
      id: 18,
      partNumber: "GFV543",
      description: "HFO-1234yf (500 ppm): N2 Balance: 103 L",
    },
    {
      id: 19,
      partNumber: "GFV544",
      description:
        "Calibration Gas Cylinder: 103L: HFO-1234yf: 1000ppm: N2 Balance",
    },
    {
      id: 20,
      partNumber: "M-700270",
      description:
        "IR-F9-HFO1234yf-0/1000-COM: HFO1234yf 0/1000 ppm: Commercial Enclosure",
    },
    {
      id: 21,
      partNumber: "M-508723",
      description:
        "Sample Draw Gas Monitoring System: SQN88: R123: 0 to 1000ppm: 8-Point Single Gas",
    },
    { id: 22, partNumber: "HBMF-1230", description: "BM-F-1230" },
    {
      id: 23,
      partNumber: "TE-AAG-B1234-00",
      description:
        "Averaging Temperature Sensor: 10K ohm Type II Thermistor: 12ft Capillary",
    },
    {
      id: 24,
      partNumber: "V-V123",
      description:
        "Enclosed Victory Relay: SPST: N.O. Relay: 24 Vac/dc: 120V AC Coil: 20A Amperage Rating: HOA Switch: Digital HOA Monitor",
    },
    {
      id: 25,
      partNumber: "GFV545",
      description: "HFO-1234yf (3000 ppm): N2 Balance: 103 L",
    },
  ];

  if (userLoggedIn === null) {
    return null;
  }

  return (
    <div className="product-section">
      <div className="filter-section">
        <h5 className="filter-by-text">Filter By:</h5>

        <div className="dropdown-container">
          <div className="dropdown-header" onClick={handleDropdownClick}>
            <Image
              src={isDropdownOpen ? CaratUp : CaratDown}
              alt="Carat icon"
              className="carat-icon"
            />
            <p className="dropdown-title">Content Type</p>
            <p className="clear-button">Clear</p>
          </div>
          <div className={`checkbox-container ${isDropdownOpen ? "open" : ""}`}>
            <div className="checkbox-item">
              <input type="checkbox" className="checkbox" id="part-number" />
              <label className="checkbox-label" htmlFor="part-number">
                Part Number(52959)
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="product-list-section">
        <p className="number-text">
          <span className="num-of-products-text">{products.length}</span>{" "}
          results
        </p>

        {products.slice(0, visibleProducts).map((product, index) => (
          <div className="products-item" key={product.id}>
            <div className="part-number-img">
              <p className="pn-title">Part Number:</p>
              <p className="part-number">{product.partNumber}</p>
            </div>
            <div className="part-item-description">
              <p className="desc-1">PART NUMBER</p>
              {/*<p className='desc-2'>{product.partNumber}</p>*/}
              {/*<Link href={userLoggedIn === "true" ? `/PipPage/${product.partNumber}` : "#"} className='details-link'>*/}
              {/* <Link href={`/PipPage/${product.partNumber}`} className='details-link'>*/}
              <Link
                href={userLoggedIn ? `/PipPage/${product.partNumber}` : "#"}
                className="details-link"
              >
                <p className="desc-2">{product.partNumber}</p>
              </Link>
              <p className="desc-3">{product.description}</p>
              <div className="details-button">
                {index < 4 ? (
                  <Link
                    href={`/PdpPage/${product.partNumber}`}
                    className="details-link"
                  >
                    Product Details
                  </Link>
                ) : (
                  <Link href={`/PdpPage`} className="details-link">
                    Product Details
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {visibleProducts < products.length && (
          <div className="load-button" onClick={handleLoadMore}>
            <p className="load-more-link">Load More</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
