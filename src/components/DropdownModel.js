import React from 'react';
import '../utils/css/dropdownmodel.css';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
function DropdownModel({ signedin,username,setSignedIn }) {

    console.log("signedin under dropdownmodel",signedin)
    const signOutHandler = () => {
      setSignedIn &&  setSignedIn(false);
    }

    return (
        <div className="card">
            {signedin && <div className="card-header">
                <h3>Welcome Aboard, {username}</h3>
            </div>}
            <div className="card-body">
                <ul>
                  { !signedin && <> <li className="list-item">
                        <span className="person-icon"></span>
                        <a >Create an Account</a>
                    </li>
                    <li className="list-item">
                        <span className="document-icon"></span>
                        <a >My Legacy Account</a>
                    </li>
                   </>}
                    { signedin && <> 
                        <li className="list-item">
                        <span className="person-icon"></span>
                        <a >My Account</a>
                    </li>
                    <li className="list-item">
                        <span className="document-icon"></span>
                        <a >My Profile</a>
                    </li>
                    <li className="list-item">
                        <span className="person-icon"></span>
                        <a >My Account</a>
                    </li>
                    <li className="list-item">
                        <span className="document-icon"></span>
                        <a >My Profile</a>
                    </li>
                    <li className="list-item">
                        <span className="person-icon"></span>
                        <a >My Account</a>
                    </li>
                    <li className="list-item">
                        <span className="document-icon"></span>
                        <a >My Profile</a>
                    </li>
                    <li className="list-item">
                        <span className="person-icon"></span>
                        <a >My Account</a>
                    </li>
                    <li className="list-item">
                        <span className="document-icon"></span>
                        <a >My Profile</a>
                    </li>
                    </>}
                </ul>
            </div>
            {<div className="card-footer">
                <div onClick={signOutHandler} className='btn-signin'><Link href=''>{signedin ? "SIGN OUT" : "Sign in to MyBuildings"}</Link></div>
            </div>}
        </div>
    );
}

export default DropdownModel;
