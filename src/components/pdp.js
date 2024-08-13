import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Save from '../utils/icons/save.svg';

const Pdp = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    // This code runs only on the client side
    const loggedInStatus = localStorage.getItem("userLoggedIn");
    setUserLoggedIn(loggedInStatus);
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="main-content">
      <div className="product-title">
        <div className="products-title-info">
          <b className="">Accessories</b>
          <h1 className="">BEAM1224 Heating Kit</h1>
          <p className="">
            Heating kits for use to prevent condensation with the BEAM1224
            conventional beam smoke detectors. They lessen the likelihood of
            condensation by maintaining the unit at a temperature that is
            slightly higher than the surrounding air.
          </p>
        </div>
      </div>

      <div className="product-info-side">
        <nav className="product-navbar">
          <ul className="product-nav-items">
            <li
              className={activeTab === "Overview" ? "active" : ""}
              onClick={() => handleTabClick("Overview")}
            >
              Overview
            </li>
            <li
              className={activeTab === "Specifications" ? "active" : ""}
              onClick={() => handleTabClick("Specifications")}
            >
              Resources
            </li>
            <li
              className={activeTab === "SKU" ? "active" : ""}
              onClick={() => handleTabClick("SKU")}
            >
              SKU
            </li>
          </ul>
        </nav>

        <div className="product-content">
          {activeTab === "Overview" && (
            <>
              <div className="image-side">
                <div className="images">
                  <img
                    src="https://honeywell.scene7.com/is/image/Honeywell65/HBT-Fire-BEAMHK-STRAIGHT-HiRes"
                    alt="BEAMHK Heating Kit"
                    className="beamhk-image-1"
                  />
                  <div className="beamhk-image">
                    {[...Array(4)].map((_, i) => (
                      <img
                        key={i}
                        src="https://honeywell.scene7.com/is/image/Honeywell65/HBT-Fire-BEAMHK-STRAIGHT-HiRes"
                        className="beamhk-image-2"
                        alt="BEAMHK Heating Kit"
                      />
                    ))}
                  </div>
                  <div>
                    <button className="savethispage">SAVE THIS PAGE AS PDF</button>
                  </div>
                </div>
              </div>

              <div className="product-overview-pdp">
                <div className="button-section">
                  <button>CONTACT US</button>
                  <button onClick={() => handleTabClick("SKU")}>BUY ONLINE</button>
                  <button>FIND A PARTNER</button>
                </div>
                <p className="product-desc-info">
                  Heating kits for use to prevent condensation with the BEAM1224
                  conventional beam smoke detectors. They lessen the likelihood
                  of condensation by maintaining the unit at a temperature that
                  is slightly higher than the surrounding air.
                </p>
                <b> Features & Benefits:</b>
                <p>To prevent condensation on the optical surface</p>
              </div>
            </>
          )}

          {activeTab === "Specifications" && (
            <div className="product-specifications">
              <table className="resources-table">
                <thead>
                  <tr className="resources-table-rows">
                    <td className="resources-table-headers">NAME</td>
                    <td className="resources-table-headers">DATE</td>
                    <td className="resources-table-headers">SIZE</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BEAMHK Heating Kit-Installation Manual</td>
                    <td>5/10/2023</td>
                    <td>591.04 KB</td>
                  </tr>
                  <tr>
                    <td>OSI-R-SS Datasheet</td>
                    <td>4/2/2022</td>
                    <td>258.57 KB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "SKU" && (
            <div className="product-resources">
              <table className="resources-table">
                <thead>
                  <tr className="resources-table-rows">
                    <td className="resources-table-headers">PART NUMBER</td>
                    <td className="resources-table-headers">COMPARE</td>
                    <td className="resources-table-headers">DESCRIPTION</td>
                    <td className="resources-table-headers"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BEAMHKR</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      Heating Kit: 15 to 32V: 450mA: For Reflector of Reflected Beam Smoke Detectors
                    </td>
                    <td>
                      <Link
                        href={`/PipPage/${"BEAMHKR"}`}
                      >
                        ORDER ONLINE
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>BEAMHK</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Heater kit for Beam detector</td>
                    <td>
                      <Link
                        href={`/PPage/${"BEAMHK"}`}
                      >
                        ORDER ONLINE
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pdp;
