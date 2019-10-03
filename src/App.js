import React, { Component } from "react";
import { Route } from "react-router-dom";
import FormContainer from "./components/Form/FormContainer";
import FeedbackButton from "./components/FeedbackButton";
import ProfileStatsContainer from "./components/ProfileStats/ProfileStatsContainer";
import LandingPage from "./components/LandingPage";
import SingleRepoStatsContainer from "./components/SingleRepoStats/SingleRepoStatsContainer";
import Wiki from "./components/Wiki";
import ClassStats from "./components/ClassStats";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormContainer />
        <Route path="/" exact component={LandingPage} />
        <Route path="/user/:username" exact component={ProfileStatsContainer} />
        <Route
          path="/user/:username/:reponame"
          exact
          component={SingleRepoStatsContainer}
        />
        <Route path="/wiki/:section" component={Wiki} />
        <Route path="class-stats" component={ClassStats} />
        <FeedbackButton />
      </div>
    );
  }
}

export default App;
