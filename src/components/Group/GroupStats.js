import React from "react";

export default class GroupStats extends React.Component {
  render() {
    return (
      <div className="group-container">
        <h1 className="on-group">{this.props.group.groupName}</h1>
        <div>
          {this.props.group.profiles.map(profile => (
            <p className="group-scores">
              {" "}
              {profile.userName} {profile.profileScore} {profile.reposScore}{" "}
            </p>
          ))}
        </div>
      </div>
    );
  }
}
