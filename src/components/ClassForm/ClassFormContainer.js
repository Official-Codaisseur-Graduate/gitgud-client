import React from "react";
import ClassForm from "./ClassForm";

// this would make a query to the DB to get data of existing stored classes
// also a request to the DB to create a new class
// find or create
export default class ClassFormContainer extends React.Component {
  state = {
    nameOfClass: ""
  };

  onSumbit = () => {};

  onChange = event => {
    this.setState({ nameOfClass: event.target.value });
  };

  render() {
    return <ClassForm onSumbit={this.onSumbit} onChange={this.onChange} />;
  }
}
