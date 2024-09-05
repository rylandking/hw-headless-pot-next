import React, { useState, useEffect } from "react";
import Link from "next/link";

const Pdp_XAL = () => {
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
          <b className="">Manual Call Points/Pull Station </b>
          <h1 className="">KILLARK® XAL-53 Explosion-Proof Pull Station</h1>
          <p className="">
            KILLARK® XAL-53 explosion-proof pull stations are suitable for use
            in hazardous areas due to the presence of flammable gases or vapors,
            combustible dust, or easily ignitable fibers.
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
                    src="https://s7d1.scene7.com/is/image/Honeywell65/hbt-Fire-P1909008-primaryimage"
                    alt="hbt-Fire-P1909008"
                    className="beamhk-image-1"
                  />
                  <div className="beamhk-image">
                    {[...Array(4)].map((_, i) => (
                      <img
                        key={i}
                        src="https://s7d1.scene7.com/is/image/Honeywell65/hbt-Fire-P1909008-primaryimage"
                        className="beamhk-image-2"
                        alt="hbt-Fire-P1909008"
                      />
                    ))}
                  </div>
                  <div>
                    <button className="savethispage">
                      SAVE THIS PAGE AS PDF
                    </button>
                  </div>
                </div>
              </div>

              <div className="product-overview-pdp">
                <div className="button-section">
                  <button>CONTACT US</button>
                  {userLoggedIn === "true" && (
                    <button onClick={() => handleTabClick("SKU")}>
                      BUY ONLINE
                    </button>
                  )}
                  <button>FIND A PARTNER</button>
                </div>
                <p className="product-desc-info">
                  KILLARK® XAL-53 explosion-proof pull stations are suitable for
                  use in hazardous areas due to the presence of flammable gases
                  or vapors, combustible dust, or easily ignitable fibers.
                  Typical applications for this product include petroleum
                  refineries, chemical and petrochemical plants, storage areas,
                  and other processing facilities where hazardous substances are
                  handled and stored.
                </p>
                <b> Features & Benefits:</b>

                <p>To prevent condensation on the optical surface</p>
                <p>Enclosure is made of copper-free aluminum alloy</p>
                <p>
                  Red, textured powder epoxy paint finish is standard on box and
                  cover and provides high visibility for alarm station
                </p>
                <p>
                  Universal normally open (one) and normally closed (one)
                  contact furnished standard
                </p>
                <p>Bilingual nameplates included per CSA requirement</p>
                <p>Internal ground screw is standard</p>
                <p>Wiring range is 24 through 12 AWG, solid or stranded</p>
                <b> Certification:</b>
                <p>UL Listed: E50498</p>
                <p>ULC Listed: E50498</p>
                <p>CSA: LR31085</p>
                <p>CSFM: 7150-1439:100</p>
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
                    <td></td>
                    <td></td>
                    <td></td>
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
                    <td>XAL-53</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Hazardous Location Pull Station, NO and NC Contacts</td>
                    <td>
                      {userLoggedIn === "true" && (
                        <Link
                          // href={`/PipPage/${"BEAMHKR"}`}
                          href={
                            userLoggedIn === "true"
                              ? `/PipPage/${"XAL-53"}`
                              : "#"
                          }
                        >
                          ORDER ONLINE
                        </Link>
                      )}
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

export default Pdp_XAL;
