import React, { Component } from "react";
import RepoAccordion from "./Accordion";
import { Link } from "react-router-dom";

export default class GeneralAccordionContainer extends Component {
  state = {
    accordionItems: [
      {
        id: 1,
        button: `Commits with "and": ${this.props.commitScore.containsAND} of ${this.props.commitScore.commitCount}`,
        panel:
          "If you have to add an “and” in your commit message, you’ve already committed too much.",
        link: <Link to={`/wiki/commits`}>Learn more</Link>
      },
      {
        id: 2,
        button: `Commits with period: ${this.props.commitScore.containsPeriod} of ${this.props.commitScore.commitCount}`,
        panel: " Don’t end the commit with a period. Save your characters.",
        link: <Link to={`/wiki/commits`}>Learn more</Link>
      },
      {
        id: 3,
        button: `Proper length commits: ${this.props.commitScore.lengthExceeds} of ${this.props.commitScore.commitCount}`,
        panel:
          "The commit title should be less than 50 characters. Shorter things are easier to read.",
        link: <Link to={`/wiki/commits`}>Learn more</Link>
      },
      {
        id: 4,
        button: `First word of commit starting with uppercase: ${this.props.commitScore.upperCase} of ${this.props.commitScore.commitCount}`,
        panel:
          "This is seen as generally good conduct by most gitsperts. Sentence case is also more professional looking and easier to read.",
        link: <Link to={`/wiki/commits`}>Learn more</Link>
      }
    ]
  };

  render() {
    return this.state.accordionItems.map(accordionItem => {
      return (
        <RepoAccordion
          allowZeroExpanded="true"
          key={accordionItem.id}
          button={accordionItem.button}
          panel={accordionItem.panel}
          link={accordionItem.link}
        />
      );
    });
  }
}
