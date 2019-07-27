import React, { Component } from 'react'
import RepoAccordion from './Accordion'

export default class GeneralAccordionContainer extends Component {
  state = {
    accordionItems: [
      {
        id: 1,
        button: `Commits with "and": ${this.props.commitScore.containsAND}`,
        panel: "If you have to add an “and” in your commit message, you’ve already committed too much."
      }, {
        id: 2,
        button: `Commits with period: ${this.props.commitScore.containsPeriod}`,
        panel: " Don’t end the commit with a period. Save your characters."
      }, {
        id: 3,
        button: `Length of commits: ${this.props.commitScore.lengthExceeds}`,
        panel: "The commit title should be less than 50 characters. Shorter things are easier to read."
      }, {
        id: 4,
        button: `First word of commit starting with uppercase: ${this.props.commitScore.upperCase}`,
        panel: "This is seen as generally good conduct by most gitsperts. Sentence case is also more professional looking and easier to read."
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
