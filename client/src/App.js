import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import FormContainer from './components/FormContainer';
import FeedbackButton from './components/FeedbackButton';
import ProfileStats from './components/ProfileStats';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route path='/' exact component={FormContainer}/>
      <Route path='/:username' exact component={ProfileStats}/>
      
      <FeedbackButton />
      </div>
    );
  }
}

export default App;
