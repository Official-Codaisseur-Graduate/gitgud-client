import React from 'react'
import { Query } from "react-apollo";
import { GET_USER_DATA } from "../../gql";
import Loader from "../Loader";
import ProfileStats from './ProfileStats';

export default class ProfileStatsContainer extends React.Component {
  render() {
    return <div><Query
      query={GET_USER_DATA}
      skip={this.props.username === ``}
      variables={{
        username: this.props.match.params.username
      }}>
      {({ loading, error, data }) => {
        if (loading)
          return <Loader />;

        if (error)
          return (
            <div className="errorBox">
              <p>Please submit valid username
            </p>
            </div>
          );
        return <div>
          {data && <ProfileStats user={data.user} />}
        </div>;
      }}
    </Query>

    </div>
  }
}

