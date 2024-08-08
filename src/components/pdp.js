import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Print from '../utils/icons/print.svg';
import Save from '../utils/icons/save.svg';
import Minus from '../utils/icons/minus.svg';
import Plus from '../utils/icons/plus.svg';
import Success from '../utils/icons/success.svg';
import CaratRight from '../utils/icons/caratright.svg';
import CaratLeft from '../utils/icons/caratright.svg';
//import '../utils/css/pdp.css';
import Link from 'next/link';
import Image from 'next/image';
import usePdpApiCall from '../customHook/usePdpApiCall';
import  {productdetailApi,productpriceApi} from '../utils/ApiList/axiosapi.js';

import useDownloader from '../customHook/useDownloader';

export default function Pdp() {

  //const Pdp = () => {
    //const router = useRouter();
    //const { id } = router.query;
    const [activeTab, setActiveTab] = useState('Overview');
    const [quantity, setQuantity] = useState(1);
    //const [product, setProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

  const data = usePdpApiCall(productdetailApi,productpriceApi);
  
  if(!data) return null;

  const specifications = data.pdpData?.classifications;
  const description = data.pdpData?.description;
  const resources = data.pdpData?.media;
  const productimg = data.pdpData?.images;
  

  console.log("pdpdataapi",data);

  const pdfDownload = (_url,filename) => {
    useDownloader(_url,filename);
    console.log("pdfdownload",_url);
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const items = [
    { src: require('../utils/images/image.png'), text: '583413', text2:'Cable set for connecting the batteries to the Comprio'},
    { src: require('../utils/images/image.png'), text: 'XAL-53', text2:'hazardous Location Pull Station, N/O and N/C Contacts' },
    { src: require('../utils/images/image.png'), text: 'P2RL', text2:'Horn Strobe, 2-wire, Indoor, Wall, Red, Marked FIRE' },
    { src: require('../utils/images/image.png'), text: 'FSP-951-IV', text2:'Photoelectric Smoke Detector, RSP-951 Series, 32 to 120F, Ivory' },
    { src: require('../utils/images/image.png'), text: 'Smoke Detector', text2:'Early warning detecor, buisness critical environments, 500 m2' },
    { src: require('../utils/images/image.png'), text: 'Stopper Dome', text2:'Smoke bubble, 60 Series mounts, installation options, 60 Series IP cameras' }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const visibleItems = [];
  for (let i = 0; i < 4; i++) {
    visibleItems.push(items[(currentIndex + i) % items.length]);
  }

  return (
      <div className="BEAMHK-Product">
        <div className='top-beamhk'>

          <div className='products-title-info'>
            <h1>BEAMHK</h1>
            <p>Heater Kit for Beam detector</p>
          </div>

          <div className='print-section'>
            <nav className='print-nav'>
              <ul className='print-nav-items'>
                <li><a href="https://buildings.honeywell.com/us/en/ecommerce"><Image src={Print} alt="Honeywell print icon" className='print-icon-1'/><span className='print-W'>Print With Price</span></a></li>
                <li><a href="https://buildings.honeywell.com/us/en/ecommerce"><Image src={Print} alt="Honeywell print icon" className='print-icon-2'/><span className='print-WO'>Print Without Price</span></a></li>

              </ul>
            </nav>
          </div>

        </div>

        <div className='middle-beamhk'>

          <div className='image-side'>
          {productimg && <div className='images'>
              <img src={productimg[1].url} className='beamhk-image-2'/>
              <img src={productimg[1].url} alt={productimg[1].altText} className='beamhk-image-1'/>
            </div>}
            <div className='add-to-cart-section'>
              <div className='save-icon-box'>
                <Image src={Save} alt="Honeywell save icon" className='save-icon'/>
              </div>
              <div className='add-to-cart-button'>
                <p className='add-to-cart-link'>ADD TO CART</p>
              </div>
            </div>

            <div className='compare-checkbox-section'>
              <input
                  type='checkbox'
                  className='compare-checkbox'
              />
              <label className='checkbox-label'>
                Compare
              </label>

            </div>
          </div>

          <div className='product-info-side'>
            <nav className='product-navbar'>
              <ul className='product-nav-items'>
                <li className={activeTab === 'Overview' ? 'active' : ''} onClick={() => handleTabClick('Overview')}>Overview</li>
                <li className={activeTab === 'Specifications' ? 'active' : ''} onClick={() => handleTabClick('Specifications')}>Specifications</li>
                <li className={activeTab === 'Resources' ? 'active' : ''} onClick={() => handleTabClick('Resources')}>Resources</li>
                <li>Training</li>
                <li>Replacement Products</li>
              </ul>
            </nav>

            <div className='product-content'>
              {activeTab === 'Overview' && description && (
                  <div className='product-overview'>
                    <p className='product-desc-title'>Product Description</p>
                    <p className='product-desc-info'>{description}</p>
                    <div className='second-level'>
                      <p>List Price</p>
                      <p>Your Price</p>
                      <p>UoM</p>
                      <p>Quantity</p>
                      <p>Subtotal</p>
                    </div>

                    <div className='third-level'>
                 
                      <p className='crossed-line-price'>USD 71.43 </p>
                     
                      <p>USD 32.50 <span className='discount-text'>(54.5% Discount)</span></p>
                      <p>EA</p>
                      <p className='quantity-box'>
                        <Image src={Minus} alt="Minus" onClick={handleDecrease} className='quantity-icon'/>
                        {quantity}
                        <Image src={Plus} alt="Plus" onClick={handleIncrease} className='quantity-icon'/>
                      </p>
                      <p>USD 162.50</p>
                    </div>
                                    
                    

                    <div className='fourth-level'>
                      <div className='amount-section'>
                        <p className='amount-available-text'><Image src={Success} alt="Honeywell success icon"
                                                                  className='success-icon'/>5 Available on 08-JUL-2024</p>
                      </div>
                      <p className='product-availability-text'>Product availabilty is estimated on current stock level,
                        which may be different at time of order processing. No reservation has been performed at this time. Delivery Dates
                        will be advised after order is processed.
                      </p>
                    </div>
                  </div>
                 

              )}
              {activeTab === 'Specifications' &&  specifications && (
                  <div className='product-specifications'>
                    <table className='specifications-table'>
                      {
                        specifications.map((specification, index) => (
                            <tr key={index} className='table-rows'>
                              <td className='table-headers'>{specification.code}</td>
                              <td>{specification.value}</td>
                            </tr>
                        ))
                      }
                    </table>
                  </div>
              )}
              {activeTab === 'Resources' && resources && (
                  <div className='product-resources'>
                    <table className='resources-table'>
                      <tr className='resources-table-rows'>
                        <td className='resources-table-headers'>Name</td>
                        <td className='resources-table-headers'>URL</td>
                      </tr>
                      {
                        resources.map((resource, index) => (
                            <tr key={index}>
                              <td>{resource.resourceName}</td>
                              <td><Link  onClick={()=>pdfDownload(resource.externalLink,resource.resourceName)} href={resource.externalLink}
                                         className='download-link'>Download</Link></td>
                            </tr>
                        ))
                      }
                    </table>
                  </div>
              )}

              {/*
            {activeTab === 'Training' && (
              <div className='product-training'>
                <p>Training content goes here...</p>
              </div>
            )}
            {activeTab === 'Replacement Products' && (
              <div className='product-replacement-products'>
                <p>Replacement Products content goes here...</p>
              </div>
            )}

            */}
            </div>
          </div>
        </div>

        <div className='who-viewed-container'>
          <h2 className='who-viewed-title'>People Who Viewed This item Also Viewed</h2>
        </div>

        <div className='bottom-beamhk'>
          <div className='carousel-container'>
            <div className='carat-container' onClick={handlePrevious}>
              <Image src={CaratLeft} alt="Left carat" className="product-carat-left" />
            </div>
            <ul className='carousel-list'>
              {visibleItems.map((item, index) => (
                  <li className='carousel-slide' key={index}>
                    <Image src={item.src} alt={`Slide ${index}`} />
                    <p className='carousel-text-top'>{item.text}</p>
                    <p className='carousel-text-bottom'>{item.text2}</p>
                  </li>
              ))}
            </ul>
            <div className='carat-container' onClick={handleNext}>
              <Image src={CaratRight} alt="Right carat" className="product-carat-right" />
            </div>
          </div>
        </div>

      </div>
  );
}