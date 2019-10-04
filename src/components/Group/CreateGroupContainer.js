import React from "react";
import { Query } from "react-apollo";
import { GET_USER_DATA } from "../../gql";
import Loader from "../Loader";
import "./Group.css";

export default class CreateGroupContainer extends React.Component {
  render() {
    const users = [];
    return (
      <div className="group-container">
        <div className="on-group">Scores</div>
        {this.props.match.params.groupMembers.split("&").map(name => (
          <div>
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
                  <div key={data.user.username} className="group-scores">
                    {data.user.username} {data.user.score}
                  </div>
                );
              }}
            </Query>
          </div>
        ))}
      </div>
    );
  }
}
