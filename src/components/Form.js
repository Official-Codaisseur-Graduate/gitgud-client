import * as React from "react";
import { Query } from "react-apollo";
import { GET_USER_DATA } from "../gql";
import ProfileStats from "./ProfileStats";
import Loader from "./Loader";
import SingleRepoStatsContainer from './SingleRepoStatsContainer'

export default function Form(props) {
  return (
    props.reponame ?
      <SingleRepoStatsContainer
        username={props.username}
        reponame={props.reponame}
      /> :
      <div>
        <form className="form" onSubmit={props.onSubmit}>
          <input
            className="form__username"
            type="text"
            name="search"
            id="1"
            placeholder="enter your username or username/repo name"
            onChange={props.onChange}
          />
          <button className="form__submit" type="submit">
            {" "}
            Go!{" "}
          </button>
        </form>

        <Query
          query={GET_USER_DATA}
          skip={props.username === ``}
          variables={{ username: props.username }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;

            if (error)
              return (
                <div className="errorBox">
                  <p>Please submit valid username </p>
                </div>
              );

            return <div> {data && <ProfileStats user={data.user} />}</div>;
          }}
        </Query>
      </div>
  );
}
