import React, { useState } from 'react';
import Home from '../utils/icons/home.svg';
import CaratRight from '../utils/icons/caratright.svg';
import Link from 'next/link';
import Image from 'next/image';
//import '../utils/css/Breadcrumb.css';


const Breadcrumb = () => {

    return (
      <div className="Breadcrumb">
  
          <li className='breadcrumb-list'>
              <ul>
              <Link href="/" type="text/css" rel="stylesheets" className='homepage-link'><Image src={Home} alt="Homepage icon" className='home-icon'/></Link>
              <Image src={CaratRight} alt="Right carat" className='carat-right'/>
              </ul>
              <ul>
                  <p className='top-text'>Search Results</p>
              </ul>
          </li>
      </div>
    );
  }
  
  export default Breadcrumb;
