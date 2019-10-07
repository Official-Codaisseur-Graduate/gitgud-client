import React from "react";
import Form from "./Form";
import "./Form.css";
import { withRouter } from "react-router";

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      username: "",
      landingPage: true,
      redirect: false,
      showButton: true,
      groupMembers: []
    };
  }

  toggleButton = e => {
    this.setState({
      showButton: true
    });
  };

  onChange = event => {
    this.setState({ search: event.target.value });
  };

  onSubmit = async event => {
    event.preventDefault();
    if (this.state.search.split(" ").length === 1) {
      await this.setState({
        username: this.state.search,
        landingPage: false,
        redirect: true
      });
      if (this.state.redirect === true) {
        this.setState({
          showButton: true
        });
        this.props.history.push(`/user/${this.state.username}`);
      }
    } else {
      await this.setState({
        groupMembers: this.state.search.split(" ")
      });
      const params = this.state.groupMembers.join("&");
      this.props.history.push(`/create-group/${params}`);
    }
  };

  onClick = (e, url) => {
    this.props.history.push(`/${url}/`);
    this.setState({
      showButton: false
    });
  };

  render() {
    const nameLenght = this.state.username.lenght;
    let slash = this.state.username.indexOf("/");
    const justRepo = this.state.username.slice(slash + 1, nameLenght);
    const justName = this.state.username.slice(0, slash);
    if (this.state.landingPage) {
      return (
        <div>
          <Form
            username={justName}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            onClick={this.onClick}
            showButton={this.state.showButton}
            toggleButton={this.toggleButton}
          />
        </div>
      );
    } else
      return (
        <div>
          <Form
            username={slash === -1 ? this.state.username : justName}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            onClick={this.onClick}
            showButton={this.state.showButton}
            toggleButton={this.toggleButton}
            reponame={slash === -1 ? null : justRepo}
            {...(slash === -1 ? this.state.username : justName)}
          />
        </div>
      );
  }
}

export default withRouter(FormContainer);
