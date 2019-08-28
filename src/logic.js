import React from 'react';
export const badge = score => {
  if (score >= 90) return (<img className="progressbar__badge" src={require("./img/git--gud-A-green.svg")} alt='A'/>) 
  if (score > 75) return (<img className="progressbar__badge" src={require("./img/git--gud-B-yellowgreen.svg")} alt='B'/>)
  if (score > 50) return (<img className="progressbar__badge" src={require("./img/git--gud-C-yellow.svg")} alt='C'/>) 
  if (score > 30) return (<img className="progressbar__badge" src={require("./img/git--gud-D-orange.svg")} alt='D'/>)
  return (<img className="progressbar__badge" src={require("./img/git--gud-E-red.svg")} alt='E'/>) 
}
