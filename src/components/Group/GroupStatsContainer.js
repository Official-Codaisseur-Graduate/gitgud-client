import React from "react";
import { Query } from "react-apollo";
import { GET_GROUP_DATA } from "../../gql";
import Loader from "../Loader";
import GroupStats from "./GroupStats";
import "./Group.css";

export default class GroupStatsContainer extends React.Component {
  render() {
    return (
      <div>
        <Query
          query={GET_GROUP_DATA}
          skip={this.props.groupName === ``}
          variables={{
            groupName: this.props.match.params.groupName
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error)
              return (
                <div className="errorBox">
                  <p>Please submit valid group name</p>
                </div>
              );
            return <div>{data && <GroupStats group={data.group} />}</div>;
          }}
        </Query>
      </div>
    );
  }
}
