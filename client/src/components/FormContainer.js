import React from 'react';
import Form from './Form';
import './Form.css';



export default class FormContainer extends React.Component {

 onSubmit = (event) => {
    event.preventDefault()
// send query here!
  };

  render() {
    return (<Form
      onSubmit={this.onSubmit}
    />)
  }
}

