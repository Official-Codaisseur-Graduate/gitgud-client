import React from "react";
import { Query, Mutation } from "react-apollo";
import { GET_USER_DATA, CREATE_GROUP_WITH_USERS } from "../../gql";
import Loader from "../Loader";
import "./Group.css";
import ProgressBar from "../ProgressBar";

export default class CreateGroupContainer extends React.Component {
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
                groupName: "wait",
                userNames: this.props.match.params.groupMembers.split("&")
              }
            }}
          >
            {mut => (
              <button className="create-group" onClick={mut}>
                Create Group
              </button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
