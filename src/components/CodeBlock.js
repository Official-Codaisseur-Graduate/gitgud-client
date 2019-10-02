import React, { PureComponent } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeInBranches = "const branches = () => {}";
const codeInGeneral = "const general = (one, two) => { one + two}";
const codeInCommits = " const commits";
const codeInProfile = "const profile";

class CodeBlock extends PureComponent {
  render() {
    console.log("params", this.props);
    return (
      <SyntaxHighlighter language={"javascript"} style={docco}>
        {this.props.section === "branches"
          ? codeInBranches
          : this.props.section === "general"
          ? codeInGeneral
          : this.props.section === "commits"
          ? codeInCommits
          : codeInProfile}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;
