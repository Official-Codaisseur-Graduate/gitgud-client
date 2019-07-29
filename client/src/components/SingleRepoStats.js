import React, { Component } from 'react'
import './SingleRepoStats.css'
import GeneralAccordionContainer from './GeneralAccordionContainer'
import BranchesAccordionContainer from './BranchesAccordionContainer'
import CommitsAccordionContainer from './CommitsAccordionContainer'

export default class SingleRepoStats extends Component {
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
          <p>This is accumulated based on the following factors:</p>
          <div className="repo__container">
            <div>
              <h4>General</h4>
              <GeneralAccordionContainer
                description={description}
                readme={repoReadMe}
                gitignore={gitIgnoreScore} />
            </div>
            <div>
              <h4>Branches</h4>
              <BranchesAccordionContainer
                branchScore={branchScore} />
            </div>
            <div>
              <h4>Commits</h4>
              <CommitsAccordionContainer
                commitScore={commitScore} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
