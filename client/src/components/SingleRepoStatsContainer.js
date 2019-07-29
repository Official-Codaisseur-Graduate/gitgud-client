import React, { Component } from 'react'
import { Query } from "react-apollo";
import { GET_REPO_DATA } from "../gql";
import Loader from "./Loader";
import SingleRepoStats from './SingleRepoStats';

export default class SingleRepoStatsContainer extends Component {
  render() {
    return (
      <div>
        <Query
          query={GET_REPO_DATA}
          skip={this.props.username === ``}
          variables={{
            username: this.props.username,
            reponame: this.props.reponame
          }}
        >

          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error)
              return (
                <div className="errorBox">
                  <p>Please submit valid repo name </p>
                </div>
              )
            console.log('DATA', data)
            return <div> {data &&
              <SingleRepoStats
                repo={data.repository}
              />
            }</div>;
          }}
        </Query>
      </div>
    )
  }
}
