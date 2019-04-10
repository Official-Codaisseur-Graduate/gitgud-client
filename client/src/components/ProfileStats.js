import * as React from 'react';
import './ProfileStats.css';



export default function ProfileStats(props) { 
  return (  <section className="stats">
  <p className="stats__username"> username: {props.username} </p>
  </section>
  )}
