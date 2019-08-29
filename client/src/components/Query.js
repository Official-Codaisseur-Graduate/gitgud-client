import React from 'react'
import {Redirect} from 'react-router-dom'
import {Query} from "react-apollo";
import {GET_USER_DATA} from "../gql";
import Loader from "./Loader";
import ProfileStats from './ProfileStats';

export default class QueryComponent extends React.Component{
  render(){
    return <div><Query
    query={GET_USER_DATA}
    skip={this.props.username === ``}
    variables={{
    username: this.props.username
  }}>
    {({loading, error, data}) => {
      console.log("LOADING", loading)
      if (loading) 
        return <Loader/>;
      
      if (error) 
        return (
          <div className="errorBox">
            <p>Please submit valid username
            </p>
          </div>
        );
      
      return <div>
        {data && <div> <ProfileStats user={data.user}/></div>}
        
        </div>;
        
    }}
  </Query>
  
   </div>
  }
}
