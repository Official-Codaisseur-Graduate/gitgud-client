import React, { PureComponent } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PropTypes from "prop-types";

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    const { language, value } = this.props;

    return (
      <div>
        <SyntaxHighlighter language={language} style={docco}>
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodeBlock;
