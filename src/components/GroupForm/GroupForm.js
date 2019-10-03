import React from "react";

export default function GroupForm(props) {
  return (
    <div>
      <input
        placeholder="enter group name"
        type="text"
        onChange={props.onChange}
        id="2"
      />
      <button type="button" onClick={props.onClick}>
        Create group
      </button>
    </div>
  );
}
