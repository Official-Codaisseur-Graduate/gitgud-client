import React from "react";
import Form from "./Form";
import "./Form.css";
import LandingPage from './LandingPage'
import { Query } from "react-apollo";
import { GET_USER_DATA } from "../gql";
import ProfileStats from "./ProfileStats";
import Loader from "./Loader";
import {Link} from 'react-router-dom'

export default class FormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      username: "",
      landingPage: true
    };
  }

  onChange = event => {
    this.setState({search: event.target.value});
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({username: this.state.search, landingPage: false});
    this.props.history.push(`/${this.state.search}`)
  };

  renderQuery = () => {
    return <Query
      query={GET_USER_DATA}
      skip={this.state.username === ``}
      variables={{ username: this.state.username }}
    >
      {({ loading, error, data }) => {
        console.log("LOADING", loading)
        if (loading) return <Loader />;

        if (error)
          return (
            <div className="errorBox">
              <p>Please submit valid username </p>
            </div>
          );

        return <div>  {data && <ProfileStats user={data.user} />}</div>;
      }}
    </Query>
  }

  render() {
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
            renderQuery={this.renderQuery}
          />
          <LandingPage/>
        </div>
      );
    } else 
      return <Form
        username={
          slash === -1
            ? this.state.username
            : justName
        }
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        reponame={
          slash === -1
            ? null
            : justRepo
        }
        renderQuery={this.renderQuery}
      />
  }
}