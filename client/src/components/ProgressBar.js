import * as React from "react";
import './ProgressBar.css';

class MultiColorProgressBar extends React.Component {
  
  render() {

    return (
      <div className="multicolor-bar">
      <div className="values">
      	<div className="value" style={{'color': 'green', 'width': this.props.profileScore + '%'}}>
	  			<span>{this.props.profileScore}%</span>
	  		</div>
        <div className="value" style={{'color': '#9111f9', 'width': this.props.repoScore + '%'}}>
	  			<span>{this.props.repoScore}%</span>
	  		</div>
      </div> 
      	<div className="scale">
        <div className="graduation" style={{'color': 'green', 'width': this.props.profileScore + '%'}}>
	  			<span>|</span>
	  		</div>
        <div className="graduation" style={{'color': '#9111f9', 'width': this.props.repoScore + '%'}}>
	  			<span>|</span>
	  		</div>
      	</div>
      	<div className="bars">
          <div className="bar" style={{'backgroundColor': 'green', 'width': this.props.profileScore + '%'}}> </div>
          <div className="bar" style={{'backgroundColor': '#9111f9', 'width': this.props.repoScore + '%'}}>
      	  </div>
          <div className="bar" style={{'backgroundColor': 'grey', 'width': 100-(this.props.repoScore + this.props.profileScore) + '%'}}> </div>
        </div>  
      	<div className="legends">
          <div className="legend">
	      		<span className="dot" style={{'color': 'green'}}>●</span>
	      		<span className="label">Profile score</span>
	      	</div>
          <div className="legend">
	      		<span className="dot" style={{'color': '#9111f9'}}>●</span>
	      		<span className="label">Git usage score</span>
	      	</div>
      	</div>
      </div>
    );
  }
}

export default MultiColorProgressBar;