import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'
import FormContainer from './components/FormContainer';
import FeedbackButton from './components/FeedbackButton';
import ProfileStatsContainer from './components/ProfileStatsContainer';
import LandingPage from './components/LandingPage';
import SingleRepoStatsContainer from './components/SingleRepoStatsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
      <FormContainer />
      <Route path='/' exact component={LandingPage}/>
      <Route path='/user/:username'  exact component={ProfileStatsContainer}/>
      <Route path='/user/:username/:reponame'  exact component={SingleRepoStatsContainer}/>
      <FeedbackButton />
      </div>
    );
  }
}

export default App;
