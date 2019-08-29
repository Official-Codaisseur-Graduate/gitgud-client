import * as React from "react";
import "./ProfileStats.css";
import ProgressBar from "./ProgressBar";
import RepoStats from "./RepoStats";
import Chart from "./Chart";


const icon = value => {
  if (value) 
    return (<img
      src={require("../img/checked.svg")}
      alt="checked"
      width="30px"
      height="30px"/>);
  return (<img
    src={require("../img/cancel.svg")}
    alt="not-checked"
    width="30px"
    height="30px"/>);
};

export default function ProfileStats(props) {
  console.log('PROPS>USER:', props)
  let profileStats

  if (props.user) {
    profileStats = props.user.profileStats;
  }

  return (
    props.user
    ?<div>
      <div className="row">
      <div className="col-1-of-3">
        <ProgressBar
          username={props.user.username}
          profileScore={props.user.profileScore}
          repoScore={props.user.repoScore}
          score={props.user.score}
          /> 
          {props.user && props.user.stats.totalPinnedRepos !== null && (
          <section className="stats__average">
            <h2>
              GitHub & Git statistics
            </h2>
            <p>
              {" "}
              Total pinned repositories: {props.user.stats.totalPinnedRepos
}{" "}
            </p>
            <p>
              {" "}
              Average number of branches:{" "} {props.user.stats.averageBranchPerRepo}
            </p>
            <p>
              {" "}
              Average commits per branch:{" "} {props.user.stats.averageCommitPerBranch}
            </p>
          </section>
        )}
        {props.user.previousScores && props.user.previousScores.length > 0 && (<Chart
          previousScores={props.user.previousScores}
          currentProfileScore={props.user.profileScore}
          currentGitScore={props.user.repoScore}/>)}
      </div>
      <div className="col-2-of-3">
        <section className="stats__profile">
          <h2 className="stats__profile-header">
            Profile Statistics
          </h2>
          {props.user && props.user.profileStats !== 0 && (
            <div className="stats__profile-container">
              <div className="stats__profile-item" key="bio">
                {icon(profileStats.bio)}
                <p className="stats__item-name">Bio</p>
              </div>
              <div className="stats__profile-item" key="email">
                {icon(profileStats.email)}
                <p className="stats__item-name">Email</p>
              </div>
              <div className="stats__profile-item" key="isHireable">
                {icon(profileStats.isHireable)}
                <p className="stats__item-name">Available for hire</p>
              </div>
              <div className="stats__profile-item" key="location">
                {icon(profileStats.location)}
                <p className="stats__item-name">Location</p>
              </div>
              <div className="stats__profile-item" key="name">
                {icon(profileStats.name)}
                <p className="stats__item-name">Name</p>
              </div>
              <div className="stats__profile-item" key="picture">
                {icon(profileStats.picture)}
                <p className="stats__item-name">Profile photo</p>
              </div>
              <div className="stats__profile-item" key="website">
                {icon(profileStats.websiteUrl)}
                <p className="stats__item-name">Personal website</p>
              </div>
              <div className="stats__profile-item" key="pinnedRepositories">
                {icon(profileStats.pinnedRepositories)}
                <p className="stats__item-name">Pinned repositories</p>
              </div>
            </div>
          )}
          {props.user.profileScore < 49 && (
            <p className="stats__improve">
              To improve your GitHub appearence manage your{" "}
              <a
                className="stats__link"
                href="https://github.com/settings/profile"
                target="_blank"
                rel="noopener noreferrer">
                settings
              </a>
            </p>
          )}
        </section>

        {props.user && props.user.stats.totalPinnedRepos !== null && (
          <section className="stats__pinnedRepos">
            <h2>
              Git Use
            </h2>
            <p>Click to check your detailed feedback per repository</p>
            {props.user.stats.repoNames && (<RepoStats repos={props.user.stats.repoNames}/>)}
          </section>
        )}

        {props.user && !props.user.stats.totalPinnedRepos && (
          <p>
            Please add some pinned repositories
          </p>
        )}
       
      </div>
      
    </div>
    </div>
    
  : null
  );
}
