import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import General from "../markdown/General.md";
import Branches from "../markdown/Branches.md";
import Commits from "../markdown/Commits.md";
import Profile from "../markdown/Profile.md";

export default class Wiki extends Component {
  state = { markdown: "" };

  componentWillMount() {
    const sectionToFetch = this.props.match.params.section;

    if (sectionToFetch === "general") {
      fetch(General)
        .then(res => res.text())
        .then(text => this.setState({ markdown: text }));
    } else if (sectionToFetch === "branches") {
      fetch(Branches)
        .then(res => res.text())
        .then(text => this.setState({ markdown: text }));
    } else if (sectionToFetch === "commits") {
      fetch(Commits)
        .then(res => res.text())
        .then(text => this.setState({ markdown: text }));
    } else if (sectionToFetch === "profile") {
      fetch(Profile)
        .then(res => res.text())
        .then(text => this.setState({ markdown: text }));
    }
  }

  render() {
    const { markdown } = this.state;
    return (
      <div>
        <ReactMarkdown source={markdown} />;
      </div>
    );
  }
}
