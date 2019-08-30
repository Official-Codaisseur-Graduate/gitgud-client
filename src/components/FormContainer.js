import React from "react";
import Form from "./Form";
import "./Form.css";
import {withRouter} from "react-router";


class FormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      username: "",
      landingPage: true,
      redirect: false
    };
  }
  
  onChange = event => {
    this.setState({search: event.target.value});
  };

  onSubmit = async(event) => {
    event.preventDefault();
    console.log('REDIRECT1:',this.state.redirect )
    await this.setState({username: this.state.search, landingPage: false, redirect: true});
    console.log('STATE NOW:', this.state)
    console.log('REDIRECT2:',this.state.redirect )
    if (this.state.redirect === true) {
      console.log('propssss', this.props);
      this.props.history.push(`/user/${this.state.username}`)
      // return <Redirect to={`/${this.state.search}`}/>
    }
  };

  render() {
    console.log('STATE:', this.state)
    const nameLenght = this.state.username.lenght
    let slash = this
      .state
      .username
      .indexOf("/")
    const justRepo = this
      .state
      .username
      .slice(slash + 1, nameLenght)
    const justName = this
      .state
      .username
      .slice(0, slash)
    if (this.state.landingPage) {
      return (
        <div>
          <Form
            username={justName}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            />
         
        </div>
      );
    } else 
      return <div><Form
        username={slash === -1
        ? this.state.username
        : justName}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        reponame={slash === -1
        ? null
        : justRepo}
       
        {...slash === -1
          ? this.state.username
          : justName} 
          />
        </div>
  }
}

export default withRouter(FormContainer)
