import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Save from '../utils/icons/save.svg';

const Pdp = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('Overview');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      // Replace with your data fetching logic
      const fetchProduct = async () => {
        const fetchedProduct = {
          id,
          name: 'BEAMHK',
          description: 'Heater Kit for Beam detector',
          listPrice: 71.43,
          yourPrice: 32.50,
          quantityAvailable: 5,
          imageUrls: [
            'https://honeywell.scene7.com/is/image/Honeywell65/HBT-Fire-BEAMHK-STRAIGHT-HiRes',
            'https://honeywell.scene7.com/is/image/Honeywell65/HBT-Fire-BEAMHK-STRAIGHT-HiRes'
          ]
        };
        setProduct(fetchedProduct);
      };
      fetchProduct();
    }
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>

    <p className="top-header">{product.name}</p>
    <h1 className='small-desc-info'>{product.description}</h1>
        <div className="products-title-info">
        <p className='detail-desc-info'>Heating kits for use to prevent condensation with the BEAM1224 conventional beam smoke detectors. They lessen the likelihood of condensation by maintaining the unit at a temperature that is slightly higher than the surrounding air.</p>
        </div>
      

      <div className="product-info-side">
        <nav className="product-navbar">
          <ul className="product-nav-items">
            <li
              className={activeTab === "Overview" ? "active" : ""}
              onClick={() => handleTabClick("Overview")}>Overview</li>
              <li
              className={activeTab === "Specifications" ? "active" : ""}
              onClick={() => handleTabClick("Specifications")}>Specifications</li>
            <li
              className={activeTab === "Resources" ? "active" : ""}
              onClick={() => handleTabClick("Resources")}>Resources</li>
            <li
              className={activeTab === "SKU" ? "active" : ""}
              onClick={() => handleTabClick("SKU")}>SKU</li>
          </ul>
        </nav>

        <div className="product-content">
          {activeTab === "Overview" && (
            <div className='product-overview'>
                <div className='middle-beamhk'>
              <div className="image-side">
                {product.imageUrls && (
                  <div className="images">
                    <img
                      src={product.imageUrls[1]}
                      className="beamhk-image-2"
                      alt="Product Image"
                    />
                    <img
                      src={product.imageUrls[1]}
                      alt="Product Image"
                      className="beamhk-image-1"
                    />
                  </div>
                )}

<div className='add-to-cart-section'>
            <div className='save-icon-box'>
                <Image src={Save} alt="Save icon" className='save-icon'/>
            </div>
            <div className='add-to-cart-button'>
              <p className='add-to-cart-link'>Save this Page as PDF</p>
            </div></div>
              </div>

              <div className="product-information">
                <div className="button-section">
                  <button>CONTACT US</button>
                  <button>BUY ONLINE</button>
                  <button>FIND A PARTNER</button>
                  
                </div>
                <p className="product-desc-info">
                Heating kits for use to prevent condensation with the BEAM1224 conventional beam smoke detectors. They lessen the likelihood of condensation by maintaining the unit at a temperature that is slightly higher than the surrounding air.


                </p>
                <b className='feats-and-benefits-title'>Features & Benefits:</b>
                
                  <li>Heater Kit for Beam detector</li>
                  <li>Prevents condensation with the BEAM1224 conventional beam smoke detectors</li>
                  
                  <b className='cert-title'>Certifications:</b>
                  <li>UL</li>
                  <li>CSFM</li>
              </div>
            </div></div>
          )}
          {activeTab === "Specifications" && (
            <div className="product-specifications">
               <li>Heater Kit for Beam detector</li>
               <li>Prevents condensation with the BEAM1224 conventional beam smoke detectors</li>
              
               
            </div>
          )}
          {activeTab === 'Resources' && (
              <div className='product-resources'>
                <table className='resources-table'>
                  <tbody>
                    <tr className='resources-table-rows'>
                      <td className='resources-table-headers'>Name</td>
                      <td className='resources-table-headers'>Date</td>
                      <td className='resources-table-headers'>Size</td>
                    </tr>
                    <tr>
                      <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                    <tr>
                    <td><Link href='' className='download-link'>Beam Smoke Detectors Applications </Link></td>
                      
                      <td>   5/17/2023</td>
                      <td>162.76 KB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          {activeTab === "SKU" && (
            <div className="product-resources">
              <table className="resources-table">
                <tr className="resources-table-rows">
                  <td className="resources-table-headers">PART NUMBER</td>
                  <td className="resources-table-headers">COMPARE</td>
                  <td className="resources-table-headers">DESCRIPTION</td>
                  <td className="resources-table-headers">ADD TO LIST</td>
                  <td className="resources-table-headers"></td>
                </tr>
                {/* Add SKU resources data here */}
                <tr>
                  <td>BEAMHK</td>
                  <td>Description</td>
              
                  <td>Description</td>
                  <td><Link href='' className='download-link'>ADD TO LIST </Link></td>

                  
                </tr>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pdp;
