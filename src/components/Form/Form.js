import * as React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

function Form(props) {
  console.log("props on form", props);
  return (
    <div>
      <form className="form" onSubmit={props.onSubmit}>
        <Link to="/">
          <button
            type="button"
            className="link__button"
            onClick={e => props.toggleButton(e)}
            style={{
              background:
                "url(https://upload.wikimedia.org/wikipedia/commons/2/22/Home_font_awesome.svg)"
            }}
          ></button>
        </Link>
        <input
          className="form__username"
          type="text"
          name="search"
          id="1"
          placeholder="enter your username or username/repo name"
          onChange={props.onChange}
        />
        <button className="form__submit" type="submit">
          {" "}
          Go!{" "}
        </button>
        {props.showButton ? (
          <button
            type="button"
            className="form__submit"
            onClick={e => props.onClick(e, "group")}
          >
            Search for existing groups
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default withRouter(Form);
