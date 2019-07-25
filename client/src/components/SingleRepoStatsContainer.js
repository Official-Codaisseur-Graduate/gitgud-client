import React, { Component } from 'react'
import { Query } from "react-apollo";
import { GET_REPO_DATA } from "../gql";
import { GET_USER_DATA } from "../gql";
import Loader from "./Loader";
import SingleRepoStats from './SingleRepoStats';

export default class SingleRepoStatsContainer extends Component {
  render() {
    console.log('SINGLE-CONTAINER-PROPS',this.props)
    return (
      <div>
        Repo statistics :)
        <Query
        query={GET_REPO_DATA}
        skip={this.props.username === ``}
        variables={{ username: this.props.username, reponame: this.props.reponame}}
      >
       
         {({ loading, error, data }) => { 
           console.log('AM I BEING CALLED?', this.props.reponame)
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
