import * as React from 'react';
import './Loader.css';

export default function Loader () { 
  return (
    <div aria-busy="true" aria-label="Loading" role="progressbar" className="container">
  <div className="swing">
    <div className="swing-l"></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div className="swing-r"></div>
  </div>
  <div className="shadow">
    <div className="shadow-l"></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div className="shadow-r"></div>
  </div>
 </div>
  )
}