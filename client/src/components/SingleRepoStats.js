import React, { Component } from 'react'
import Loader from "./Loader";

export default function SingleRepoStats(props) {
  console.log('PROPS OF SingleRepoStats', props)
    return (
      <div>
        total score: {props.repo.branchScore.totalScore}
        <br/>
        {/* mail: {props.user.email} */}
      </div>
    )
}
