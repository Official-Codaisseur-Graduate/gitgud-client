import React from 'react';
import Form from './Form';
import './Form.css';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';




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

