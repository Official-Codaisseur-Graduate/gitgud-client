import React from "react";

export default class GroupStats extends React.Component {
  render() {
    console.log("props in g stats", this.props);
    return <div>{this.props.group.groupName}</div>;
  }
}
