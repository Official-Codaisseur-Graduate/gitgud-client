import * as React from "react";
import "./ProfileStats.css";

const icon = value => {
  if (value)
    return (
      <img
        src={require("../img/checked.svg")}
        alt="checked"
        width="30"
        height="30"
      />
    );
  return (
    <img
      src={require("../img/cancel.svg")}
      alt="not-checked"
      width="30"
      height="30"
    />
  );
};

export default function ProfileStats(props) {
  console.log(props);
  const profileStats = props.user.profileStats;
  return (
    <section className="stats">
      <p className="stats__username"> username: {props.user.username} </p>
      <p className="stats__score">
        {" "}
        Your Github accout strength: {props.user.score}%{" "}
      </p>

      <section className="stats__profile">
        <h2 className="stats__profile-header"> Profile statistics </h2>
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
              <p className="stats__item-name">Full name</p>
            </div>
            <div className="stats__profile-item" key="picture">
              {icon(profileStats.picture)}
              <p className="stats__item-name">Propper profile photo</p>
            </div>
            <div className="stats__profile-item" key="website">
              {icon(profileStats.websiteUrl)}
              <p className="stats__item-name">URL to your website / LinkedIn</p>
            </div>
            <div className="stats__profile-item" key="pinnedRepositories">
              {icon(profileStats.pinnedRepositories)}
              <p className="stats__item-name">Pinned repositories</p>
            </div>
          </div>
        )}
      </section>
      {props.user && props.user.stats.totalPinnedRepos !== null && (
        <section className="stats__average">
          <h2> Average github usage </h2>
          <p>
            {" "}
            Total pinned repositories: {props.user.stats.totalPinnedRepos}{" "}
          </p>
          <p>
            {" "}
            Average number of branches: {props.user.stats.averageBranchPerRepo}
          </p>
          <p>
            {" "}
            Average number of commits per branch:{" "}
            {props.user.stats.averageCommitPerBranch}
          </p>
        </section>
      )}
      {props.user && props.user.stats.totalPinnedRepos !== null && (
        <section className="stats__pinnedRepos">
          <h2> Click to see detailed feedback about each repository </h2>
          {props.user.stats.repoNames &&
            props.user.stats.repoNames.map(repo => {
              return (
                <button key={repo.name} className="stats__repo-button">
                  {" "}
                  {repo.name}
                </button>
              );
            })}
        </section>
      )}

      {props.user && !props.user.stats.totalPinnedRepos && (
        <p> Please add some pinned repositories </p>
      )}
    </section>
  );
}
