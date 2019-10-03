import React from "react";

export default class ClassForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          placeholder="enter class name"
          type="text"
          onChange={this.props.onChange}
        />
        <button type="submit">Create class</button>
      </form>
    );
  }
}
