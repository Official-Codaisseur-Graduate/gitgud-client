import React from 'react';
import './RepoStats.css';

export default class Tabs extends React.Component {
  constructor() {
      super();
      this.state = {
          activeTab: 0,
      }

      this.changeTabOnClick = this.changeTabOnClick.bind(this);
  }

  changeTabOnClick(index) {
      this.setState({
          activeTab: index
      });
  }

  render() {
      return (
          <div className="tabs-body">
              <TabHeader data={this.props.repos}
                         click={this.changeTabOnClick}
                         activeId={this.state.activeTab} />
              <TabContent data={this.props.repos}
                          activeId={this.state.activeTab} />
          </div>
      )
  }
}

class TabHeader extends React.Component {
  onClick(index, event) {
      this.props.click(index);
  }

  render() {
      let activeClass = this.props.activeId;

      let buttons = this.props.data.map((item, index) => {
          return <li className={(activeClass === index ? 'active' : '')}>
                      <button onClick={this.onClick.bind(this, index)} ><span>{item.name}</span></button>
                  </li>
      });

      return (
          <ul className="tabs-header">{buttons}</ul>
      )
  }

}

class TabContent extends React.Component {
  render() {
      let activeClass = this.props.activeId;

      let content = this.props.data.map((item, index) => {
          return <div  className={'tabs-textItem ' + (activeClass === index ? 'show' : '')} >
          <h2>Your total repository score: {item.totalRepoScore}%</h2>
          <p> This is accumulated based on following factors: </p>
          <ul>
            <li> Readme: {item.repoReadMe < 100 ? 'You don`t have a readme in your repository': '100%'}</li>
            <li> Gitignore: {item.repoReadMe < 100 ? 'You don`t have a gitignore in your repository': '100%'}
            </li>
            <li> Description: {!item.description ? 'You don`t have a description in your repository - 0%': '100%'}
            </li>
          </ul>
          <ul> Branches
            <li> Total score: {item.branchScore.totalScore}%</li>
            <li> Master branch: {item.branchScore.hasMasterBranch < 100 ? 'You don`t have a master branch in your repository': '100%'}</li>
            <li> Development branch: {item.branchScore.hasDevelopmentBranch < 100 ? 'You don`t have a development branch in your repository': '100%'}</li>
            <li> Feature branches: {item.branchScore.hasFeatBranch < 100 ? 'You don`t have a feature branch in your repository': '100%'}</li>
            <li> Number of branches: {item.branchScore.hasThreeBranches < 100 ? 'You have less then three branches in your repository': '100%'}</li>
            <li> Naming: {item.branchScore.useDescriptiveNames < 100 ? 'Please consider renaming your branches. They are not descriptive enough': '100%'}</li>
          </ul>
          <ul> Commits 
            <li> Total score: {item.commitScore.totalScore}% </li>
            <li> Commits with "and":{item.commitScore.containsAND}%
            </li>
            <li> Commits with period:{item.commitScore.containsPeriod}%
            </li>
            <li> Length of commits:{item.commitScore.lengthExceeds}%
            </li>
            <li> First word of commit starting with uppercase {item.commitScore.upperCase}%
            </li>
          </ul>
          </div>
      });

      return (
          <div className="tabs-content">{content}</div>
      );
  }
}




