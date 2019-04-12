import React from 'react';
import Form from './Form';
import './Form.css';


export default class FormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        search: '',
        username: '',
    }
  }

  onChange = (event) => {
    this.setState({
        search: event.target.value
    })
  }

 onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      username: this.state.search
    })
  };

  render() {

    return ( 
      <Form 
        username={this.state.username}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
    )
  }
}

