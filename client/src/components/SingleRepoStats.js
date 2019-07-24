import React, { Component } from 'react'
import Loader from "./Loader";

export default function SingleRepoStats(props) {
  console.log('PROPS OF SingleRepoStats', props.user)
    return (
      <div>
        username: {props.user.username}
        <br/>
        mail: {props.user.email}
      </div>
    )
}
