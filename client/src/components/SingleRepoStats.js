import React, { Component } from 'react'
import './SingleRepoStats.css'

export default class SingleRepoStats extends Component {
  constructor(props) {
    super(props)
    console.log('PROPS OF SingleRepoStats', this.props.repo)
  }
  render() {
    const {
      name,
      branchScore,
      commitScore,
      totalRepoScore,
      gitIgnoreScore,
      description,
      repoReadMe
    } = this.props.repo

    return (
      <div>
        <div className="stats__profile">
          <p className="repo__name-title">Repository:</p>
        <h1 className="repo__name">{name}</h1>
          <h3>Total Repository score: </h3>
          <p className="repo__score">{totalRepoScore}</p>
          <h6>This is accumulated based on folowing factors:</h6>
          <div className="repo__container">
            <div>
              <h4>General</h4>
              <h5>Descritpion: {description ? 'available' : 'missing'}</h5>
              <h5>Readme: {repoReadMe}</h5>
              <h5>Gitignore: {gitIgnoreScore}</h5>
            </div>
            <div>
              <h4>Branches</h4>
              <h5>Master branch: {branchScore.hasMasterBranch}</h5>
              <h5>Development branch: {branchScore.hasDevelopmentBranch}</h5>
              <h5>Feature branch: {branchScore.hasFeatBranch}</h5>
              <h5>Number of branches: {branchScore.hasThreeBranches}</h5>
              <h5>Naming: {branchScore.useDescriptiveNames}</h5>
              <h4>Total branches sore: {branchScore.totalScore}</h4>
            </div>
            <div>
              <h4>commits</h4>
              <h5>Commits with 'and': {commitScore.containsAND}</h5>
              <h5>Commits with period: {commitScore.containsPeriod}</h5>
              <h5>Length of commits: {commitScore.lengthExceeds}</h5>
              <h5>First word of commit starting with uppercase:{commitScore.upperCase} </h5>
              <h4>Total commits score: {commitScore.totalScore}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
