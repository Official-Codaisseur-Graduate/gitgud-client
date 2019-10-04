import React from "react";
import { Query } from "react-apollo";
import { GET_USER_DATA } from "../gql";
import Loader from "./Loader";
import GroupStats from "./GroupStats";

export default class CreateGroupContainer extends React.Component {
  render() {
    console.log("params", this.props.match.params);
    const users = [];
    console.log("users", users);
    return (
      <div>
        {this.props.match.params.groupMembers.split("&").map(name => (
          <p key={name}>{name}</p>
        ))}
        Scores:
        {this.props.match.params.groupMembers.split("&").map(name => (
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
                    <p>Please submit valid username</p>
                  </div>
                );
              users.push(data);
              return (
                <div key={data.user.username}>
                  {data.user.username} {data.user.score}
                </div>
              );
              //  return <div>{data && <GroupStats user={data.user} />}</div>;
            }}
          </Query>
        ))}
      </div>
    );
  }
}
