import * as React from 'react'

export default function Form(props) { 
  return (<form className="form"  onSubmit={props.onSubmit}>
    <input className="form__username" type='text' name="name" id="1" placeholder="please sumbit your username" />
    <button className="form__submit" type="submit"> Go! </button>
    </form>
  )}
