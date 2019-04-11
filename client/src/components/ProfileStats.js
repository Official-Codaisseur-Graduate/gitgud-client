import * as React from "react";
import "./ProfileStats.css";

const spacecamel = string => {
  const stringToLowerCase = string
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
  return stringToLowerCase.charAt(0).toUpperCase() + stringToLowerCase.slice(1);
};

export default function ProfileStats(props) {
  console.log(props);
  return (
    <section className="stats">
      <p className="stats__username"> username: {props.user.username} </p>
      <p className="stats__score">
        {" "}
        Your Github accout strength: {props.user.score}%{" "}
      </p>

      <section className="stats__profile">
        {props.user &&
          props.user.profileStats !== 0 &&
          Object.entries(props.user.profileStats).map(([key, value]) => {
            if (key !== "__typename") {
              return (
                <div className="stats__profile-item" key={key}>
                  {value ? (
                    <img
                      src={require("../img/checked.svg")}
                      alt="checked"
                      width="30"
                      height="30"
                    />
                  ) : (
                    <img
                      src={require("../img/cancel.svg")}
                      alt="not-checked"
                      width="30"
                      height="30"
                    />
                  )}
                  <p className="stats__item-name">{spacecamel(key)}</p>
                </div>
              );
            }
          })}
      </section>
      {props.user && props.user.stats.totalPinnedRepros !== null && (
        <section className="stats__average">
          <h2> Average github usage </h2>
          <p>
            {" "}
            Total pinned repositories: {props.user.stats.totalPinnedRepros}{" "}
          </p>
          <p>
            {" "}
            Average number of branches: {props.user.stats.averageBranchPerRepro}
          </p>
          <p>
            {" "}
            Average number of commits per branch:{" "}
            {props.user.stats.averageCommitPerBranch}
          </p>
        </section>
      )}
      {props.user && props.user.stats.totalPinnedRepros !== null && (
        <section className="stats__pinnedRepos">
          <h2> Click to see detailed feedback about each repository </h2>
          {props.user.stats.repoNames &&
            props.user.stats.repoNames.map(repo => {
              return (
                <button key={repo} className="stats__repo-button">
                  {" "}
                  {repo}
                </button>
              );
            })}
        </section>
      )}

      {props.user && !props.user.stats.totalPinnedRepros && (
        <p> Please add some pinned repositories </p>
      )}
    </section>
  );
}
