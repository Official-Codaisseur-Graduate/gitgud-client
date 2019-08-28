import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import FormContainer from './components/FormContainer';
import FeedbackButton from './components/FeedbackButton'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route path='/' exact component={FormContainer}/>
      
      <FeedbackButton />
      </div>
    );
  }
}

export default App;
