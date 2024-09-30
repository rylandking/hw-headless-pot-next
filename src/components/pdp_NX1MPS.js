import React, { useState, useEffect } from "react";
import Link from "next/link";

const Pdp_NX1MPS = () => {
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
          <b className="">Control Panels</b>
          <h1 className="">NX1MPS Metal Enclosure Starter Kit</h1>
          <p className="">
            NX1MPS metal enclosure starter kits are for NetAXS-123™ web-based
            access control systems and includes a 4A power supply and 7 AH
            battery backup.
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
                    src="https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1904147-primaryimage"
                    alt="hbt-Security-P1904147"
                    className="beamhk-image-1"
                  />
                  <div className="beamhk-image">
                    {[...Array(4)].map((_, i) => (
                      <img
                        key={i}
                        src="https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1904147-primaryimage"
                        className="beamhk-image-2"
                        alt="hbt-Security-P1904147"
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
                  NX1MPS metal enclosure starter kits are for NetAXS-123™
                  web-based access control systems and includes a 4A power
                  supply and 7 AH battery backup.
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
                    <td>NX1MPS10</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      Security Control Panel, 1 Door, Metal Enclosure, 4A Power
                      Supply and 12V, 7 AH Battery Backup
                    </td>
                    <td>
                      {userLoggedIn === "true" && (
                        <Link
                          href={
                            userLoggedIn === "true"
                              ? `/PipPage/${"NX1MPS10"}`
                              : ""
                          }
                        >
                          ORDER ONLINE
                        </Link>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>NX1MPS30</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>NETAXS123:1DR,STANDMETAL OP30</td>
                    <td>
                      {userLoggedIn === "true" && (
                        <Link
                          // href={`/PipPage/${"BEAMHKR"}`}
                          href={
                            userLoggedIn === "true"
                              ? `/PipPage/${"NX1MPS30"}`
                              : ""
                          }
                        >
                          ORDER ONLINE
                        </Link>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>NX1MPS40</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>NETAXS123:1DR,STANDMETAL OP30</td>
                    <td>
                      {userLoggedIn === "true" && (
                        <Link
                          href={
                            userLoggedIn === "true"
                              ? `/PipPage/${"NX1MPS40"}`
                              : ""
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

export default Pdp_NX1MPS;
