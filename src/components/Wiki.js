import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import General from "../markdown/General.md";
import Branches from "../markdown/Branches.md";
import Commits from "../markdown/Commits.md";
import Profil from "../markdown/Profile.md";

const wikiStyle = {
  margin: '0 auto',
  width: '65%',
  padding: '15px'
}

export default class Wiki extends Component {
  state = { markdown: "" };

  componentWillMount() {
    fetch(General)
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
  }
  render() {
    const { markdown } = this.state;

    return (
      <div style={wikiStyle}>
        <ReactMarkdown source={markdown} />;
      </div>
    );
  }
}
