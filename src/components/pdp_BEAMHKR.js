import React, { useState, useEffect } from "react";
import Link from "next/link";

const Pdp_BEAMKHKR = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("userLoggedIn");
    setUserLoggedIn(loggedInStatus);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="main-content">
      <div className="product-title">
        <div className="products-title-info">
          <b className="">Accessories</b>
          <h1 className="">Linear smoke detector</h1>
          <p className="">
            Notifier intelligent reflective graphic linear beam detector
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
                    src="https://honeywell.scene7.com/is/image/Honeywell65/HBT-Fire-BEAMMMK-RIGHT-HiRes"
                    alt="HBT-Fire-BEAMMMK"
                    className="beamhk-image-1"
                  />
                  <div className="beamhk-image">
                    {[...Array(4)].map((_, i) => (
                      <img
                        key={i}
                        src="https://honeywell.scene7.com/is/image/Honeywell65/HBT-Fire-BEAMLRK-STRAIGHT-HiRes"
                        className="beamhk-image-2"
                        alt="HBT-Fire-BEAMMMK"
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
                  Notifier intelligent reflective image linear beam detector
                </p>
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
                <tbody></tbody>
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
                    <td>BEAMLRK</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Long Range Reflector Kit, 70 to 100m Range</td>
                    <td>
                      {userLoggedIn === "true" && (
                        <Link
                          // href={`/PipPage/${"BEAMHKR"}`}
                          href={
                            userLoggedIn === "true"
                              ? `/PipPage/${"BEAMLRK"}`
                              : "#"
                          }
                        >
                          ORDER ONLINE
                        </Link>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>BEAMMMK</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Access Multi Mount Kit</td>
                    <td>
                      <Link
                        // href={`/PipPage/${"BEAMHKR"}`}
                        href={
                          userLoggedIn === "true"
                            ? `/PipPage/${"BEAMMMK"}`
                            : "#"
                        }
                      >
                        ORDER ONLINE
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td>BEAMSMK</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      Surface mounting kit for use with Reflective Projected
                      Beam Smoke Detectors
                    </td>
                    <td>
                      {userLoggedIn === "true" && (
                        <Link
                          href={
                            userLoggedIn === "true"
                              ? `/PipPage/${"BEAMSMK"}`
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

export default Pdp_BEAMKHKR;
