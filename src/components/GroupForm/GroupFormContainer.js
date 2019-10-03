import React from "react";
import { withRouter } from "react-router";

import GroupForm from "./GroupForm";

class GroupFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      groupName: "",
      landingPage: true,
      redirect: false
    };
  }

  onClick = async e => {
    e.preventDefault();
    this.setState({
      groupName: this.state.search,
      landingPage: false,
      redirect: true
    });
    if (this.state.redirect === true) {
      this.props.history.push(`/group/${this.state.groupName}`);
    }
  };

  onChange = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    return <GroupForm onClick={this.onClick} onChange={this.onChange} />;
  }
}

export default withRouter(GroupFormContainer);
