import React from "react";
import { Query, Mutation } from "react-apollo";
import { GET_USER_DATA, CREATE_GROUP_WITH_USERS } from "../../gql";
import Loader from "../Loader";
import "./Group.css";
import ProgressBar from "../ProgressBar";

export default class CreateGroupContainer extends React.Component {
  state = {
    groupName: "",
    tooLong: false,
    tooShort: false
  };

  onSubmit = async event => {
    event.preventDefault();
    if (this.state.groupName && this.state.groupName.length > 20) {
      this.setState({
        tooLong: true
      });
    } else if (this.state.groupName && this.state.groupName.length <= 3) {
      this.setState({
        tooShort: true
      });
    } else {
      this.setState({
        tooShort: false,
        tooLong: false,
        groupName: ""
      });
    }
  };

  onChange = event => {
    this.setState({
      groupName: event.target.value
    });
  };

  render() {
    const users = [];
    return (
      <div className="group-container">
        <div className="on-group">Scores</div>
        {this.props.match.params.groupMembers.split("&").map(name => (
          <div key={name}>
            <Query
              query={GET_USER_DATA}
              skip={this.props.username === ``}
              variables={{
                username: name
              }}
              key={name}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loader />;

                if (error)
                  return (
                    <div className="errorBox">
                      <p>Please submit valid usernames</p>
                    </div>
                  );
                users.push(data);
                return (
                  <ProgressBar
                    username={data.user.username}
                    profileScore={data.user.profileScore}
                    repoScore={data.user.repoScore}
                    score={data.user.score}
                  />
                );
              }}
            </Query>
          </div>
        ))}
        <div className="button-group">
          <Mutation
            mutation={CREATE_GROUP_WITH_USERS}
            variables={{
              input: {
                groupName: this.state.groupName,
                userNames: this.props.match.params.groupMembers.split("&")
              }
            }}
          >
            {mut => (
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  placeholder="Enter group name"
                  onChange={this.onChange}
                  className="form__group"
                  name="groupName"
                  value={this.state.groupName}
                  maxLength="20"
                  title="nanana"
                  pattern={[
                    '^.{3,}$', // min 3 chars
                  ]}
                  
                ></input>
                {this.state.tooLong ? (
                  <p className="warning">Group name is too long</p>
                ) : this.state.tooShort ? (
                  <p className="warning">Group name is too short</p>
                ) : null}
                <button className="create-group" onClick={mut}>
                  Create Group
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
