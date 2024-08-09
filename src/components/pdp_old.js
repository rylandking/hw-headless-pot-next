import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Print from '../utils/icons/print.svg';
import Save from '../utils/icons/save.svg';
import Minus from '../utils/icons/minus.svg';
import Plus from '../utils/icons/plus.svg';
import Success from '../utils/icons/success.svg';
//import '../utils/css/pdp.css';
import Link from 'next/link';
import Image from 'next/image';

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
        // Example data fetch (Replace this with your actual API call)
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
    <div className="BEAMHK-Product">
      <div className='top-beamhk'>
        <div className='products-title-info'>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
        <div className='print-section'>
          <nav className='print-nav'>
            <ul className='print-nav-items'>
              <li><Link href=""><Image src={Print} alt="Print with price" className='print-icon-1'/><span className='print-W'>Print With Price</span></Link></li>
              <li><Link href=""><Image src={Print} alt="Print without price" className='print-icon-2'/><span className='print-WO'>Print Without Price</span></Link></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className='middle-beamhk'>
        <div className='image-side'>
          <div className='images'>
            {product.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Product Image ${index + 1}`} className={`beamhk-image-${index + 1}`} />
            ))}
          </div>
          <div className='add-to-cart-section'>
            <div className='save-icon-box'>
                <Image src={Save} alt="Save icon" className='save-icon'/>
            </div>
            <div className='add-to-cart-button'>
              <p className='add-to-cart-link'>ADD TO CART</p>
            </div>
          </div>
          <div className='compare-checkbox-section'>
            <input type='checkbox' className='compare-checkbox'/>
            <label className='checkbox-label'>Compare</label>
          </div>
        </div>

        <div className='product-info-side'>
          <nav className='product-navbar'>
            <ul className='product-nav-items'>
              <li className={activeTab === 'Overview' ? 'active' : ''} onClick={() => handleTabClick('Overview')}>Overview</li>
              <li className={activeTab === 'Specifications' ? 'active' : ''} onClick={() => handleTabClick('Specifications')}>Specifications</li>
              <li className={activeTab === 'Resources' ? 'active' : ''} onClick={() => handleTabClick('Resources')}>Resources</li>
              <li>SKUs</li>
              {/*<li>Replacement Products</li>*/}
            </ul>
          </nav>

          <div className='product-content'>
            {activeTab === 'Overview' && (
              <div className='product-overview'>
                {/*<p className='product-desc-title'>Product Description</p>*/}
                <p className='product-desc-info'>Heating kits for use to prevent condensation with the BEAM1224 conventional beam smoke detectors. They lessen the likelihood of condensation by maintaining the unit at a temperature that is slightly higher than the surrounding air.</p>
                <p className='feats-and-benefits-title'>Features & Benefits:</p>
                <p className='cert-title'>Certifications:</p>
                <div className='second-level'>
                  <p>List Price</p>
                  <p>Your Price</p>
                  <p>UoM</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                </div>
                <div className='third-level'>
                  <p className='crossed-line-price'>USD {product.listPrice.toFixed(2)}</p>
                  <p>USD {product.yourPrice.toFixed(2)} <span className='discount-text'>(54.5% Discount)</span></p>
                  <p>EA</p>
                  <p className='quantity-box'>
                    <Image src={Minus} alt="Minus" onClick={handleDecrease} className='quantity-icon'/>
                    {quantity}
                    <Image src={Plus} alt="Plus" onClick={handleIncrease} className='quantity-icon'/>
                  </p>
                  <p>USD {(quantity * product.yourPrice).toFixed(2)}</p>
                </div>
                <div className='fourth-level'>
                  <div className='amount-section'>
                    <p className='amount-available-text'><Image src={Success} alt="Success icon" className='success-icon'/> {product.quantityAvailable} Available on 08-JUL-2024</p>
                  </div>
                  <p className='product-availability-text'>Product availability is estimated on current stock level, which may be different at time of order processing. No reservation has been performed at this time. Delivery Dates will be advised after order is processed.</p>
                </div>
              </div>
            )}
            {activeTab === 'Specifications' && (
              <div className='product-specifications'>
                <table className='specifications-table'>
                  <tbody>
                    <tr className='table-rows'>
                      <td className='table-headers'>Nominal Power Consumption</td>
                      <td>1.6 W @ 24 V</td>
                    </tr>
                    <tr>
                      <td className='table-headers'>Maximum Power Consumption</td>
                      <td>3 @ 32 V W</td>
                    </tr>
                    <tr>
                      <td className='table-headers'>Maximum Current Rating</td>
                      <td>924K</td>
                    </tr>
                    <tr>
                      <td className='table-headers'>Maximum Operating Voltage</td>
                      <td>32VLT</td>
                    </tr>
                    <tr>
                      <td className='table-headers'>Minimum Operating Voltage</td>
                      <td>15VLT</td>
                    </tr>
                    <tr>
                      <td className='table-headers'>Brand</td>
                      <td>System Sensor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'Resources' && (
              <div className='product-resources'>
                <table className='resources-table'>
                  <tbody>
                    <tr className='resources-table-rows'>
                      <td className='resources-table-headers'>Name</td>
                      <td className='resources-table-headers'>URL</td>
                    </tr>
                    <tr>
                      <td>Beam Smoke Detectors Applications Guide</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>hbt-fire-BEAMHK-LEFT</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>BEAM1224 and BEAM1224S BEAM Detectors Data Sheet</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>OSI-R-SS Datasheet</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>BEAMHK Heating Kit-Installation Manual</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>BD-SS and BDT-SS Beam Detectors Datasheet</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>_HBT-BP-Fire-BEAMHK-PrimaryPhoto.png</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>hbt-fire-BEAMHK-LEFT</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                    <tr>
                      <td>_hbt-fire-beamhk-beam1224-heating-kit-primaryimage.png</td>
                      <td><Link href='' className='download-link'>Download</Link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='bottom-beamhk'></div>
    </div>
  );
};

export default Pdp;