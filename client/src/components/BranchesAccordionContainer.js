import React, { Component } from 'react'
import RepoAccordion from './Accordion'

export default class GeneralAccordionContainer extends Component {
  state = {
    accordionItems: [
      { id: 1,
        button: `Master branch: ${this.props.branchScore.hasMasterBranch}`,
        panel: "‘master’ is considered to be the main branch where the source code of HEAD always reflects a production-ready state."
      }, {
        id: 2,
        button: `Development branch: ${this.props.branchScore.hasDevelopmentBranch}`,
        panel: " ‘development’ is considered to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the “integration branch”."
      }, {
        id: 3,
        button: `Feature branch:  ${this.props.branchScore.hasFeatBranch}`,
        panel: "feature branches are among the ‘supporting branches’. These branches are you to work on features and unlike the main branches, these branches always have a limited life time, since they will be removed eventually."
      }, {
        id: 4,
        button: `Number of Branches: ${this.props.branchScore.hasThreeBranches}`,
        panel: "You should have at least three branches on your repository."
      }, {
        id: 5,
        button: `Naming:  ${this.props.branchScore.useDescriptiveNames}`,
        panel: "All branches, including supporting branches have naming conventions. They should start with master, development, feature, bug, hotfix or junk."
      }
    ]
  }

  render() {
    return (
      this.state.accordionItems.map(accordionItem => {
        return <RepoAccordion
        key={accordionItem.id}
          button={accordionItem.button}
          panel={accordionItem.panel}
        />
      })
    )
  }
}
