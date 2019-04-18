import * as React from "react";
import './ProgressBar.css';
import {badge} from '../logic';

class MultiColorProgressBar extends React.Component {
  
  render() {

    return (
      <div className="progressbar">
      <div className="progressbar__header-container">
        {badge(this.props.score)}
        <h1> You total profile strength: {this.props.profileScore + this.props.repoScore}% </h1>
      </div>
      <div className="progressbar__bar">
        <div className="progressbar__profile" style={{'width': this.props.profileScore + '%'}}></div>
        <div className="progressbar__repos" style={{ 'width': this.props.repoScore + '%'}}></div>
        <div className="progressbar__rest" style={{'color': 'grey', 'width': 100-(this.props.repoScore + this.props.profileScore) + '%'}}></div>
      </div>
    
      <div className="progressbar__labels">
        <p className="progressbar__label  progressbar__label--profile">
          Profile info — <span>{this.props.profileScore}</span>%
        </p>
        <p className="progressbar__label  progressbar__label--repos">
          Repositories design — <span>{this.props.repoScore}</span>%
        </p>
      </div>
    </div>
    );
  }
}



export default MultiColorProgressBar;