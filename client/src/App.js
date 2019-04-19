import React, { Component } from 'react';
import FormContainer from './components/FormContainer';
import FeedbackButton from './components/FeedbackButton'

class App extends Component {
  render() {
    return (
      <div className="App">
      <FormContainer />
      <FeedbackButton />
      </div>
    );
  }
}

export default App;
