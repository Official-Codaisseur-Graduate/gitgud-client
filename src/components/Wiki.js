import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import General from "../markdown/General.md";
import Branches from "../markdown/Branches.md";
import Commits from "../markdown/Commits.md";
import Profile from "../markdown/Profile.md";

const wikiStyle = {
  margin: '0 auto',
  width: '65%',
  padding: '15px'
}

export default class Wiki extends Component {
  state = { markdown: "" };

  componentWillMount() {
    const sectionToFetch = this.props.match.params.section;
    const map = {
      general: General,
      branches: Branches,
      commits: Commits,
      profile: Profile
    };

    fetch(map[sectionToFetch])
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    return (
      <div style={wikiStyle}>
        <ReactMarkdown source={markdown} />
      </div>
    );
  }
}
