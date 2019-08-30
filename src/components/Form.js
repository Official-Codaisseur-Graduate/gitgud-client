import * as React from "react";
import {Link} from 'react-router-dom'


export default function Form(props) {
  return (
      <div>
        <form className="form" onSubmit={props.onSubmit}>
          <Link to='/'><img  src ='https://upload.wikimedia.org/wikipedia/commons/2/22/Home_font_awesome.svg' alt='home'/></Link>
          <input
            className="form__username"
            type="text"
            name="search"
            id="1"
            placeholder="enter your username  or username/repo name"
            onChange={props.onChange}
          />
          <button className="form__submit" type="submit">
            {" "}
            Go!{" "}
          </button>
        </form>

        
      </div>
  );
}
