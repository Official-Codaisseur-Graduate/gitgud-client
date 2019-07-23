import React from "react";
import Form from "./Form";
import "./Form.css";
import LandingPage from './LandingPage'

export default class FormContainer extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      search: "",
      username: "",
      landingPage: true,
    };
  }

  onChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      username: this.state.search,
      landingPage: false
    });
  };


    render() {
      const nameLenght = this.state.username.lenght
      let slash = this.state.username.indexOf("/")
      const justRepo = this.state.username.slice(slash+1, nameLenght)
      console.log('SLASH IS', slash)
    if(this.state.landingPage){
    return (
      <div>
      <Form
        username={this.state.username}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
      <LandingPage />
      </div>
    );
  } else return <Form
      username={this.state.username}
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      reponame={slash === -1 ? null : justRepo }
    />
  }
}
