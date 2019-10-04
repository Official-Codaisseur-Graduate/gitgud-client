import React from "react";
import ProgressBar from "../ProgressBar";

export default class GroupStats extends React.Component {
  render() {
    return (
      <div className="group-container">
        <h1 className="on-group">{this.props.group.groupName}</h1>
        <div>
          {this.props.group.profiles.map(profile => {
            const reposScore = profile.reposScore / 2;
            return (
              <ProgressBar
                username={profile.userName}
                profileScore={profile.profileScore}
                repoScore={reposScore}
                score={profile.profileScore + reposScore}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
