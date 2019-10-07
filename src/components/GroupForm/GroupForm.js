import React from "react";
import "./GroupForm.css";

export default function GroupForm(props) {
  return (
    <div className="group__form">
      <input
        className="form__username"
        placeholder="enter group name"
        type="text"
        onChange={props.onChange}
        id="2"
      />
      <button className="form__submit" type="button" onClick={props.onClick}>
        Search group
      </button>
    </div>
  );
}
