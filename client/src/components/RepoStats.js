import React, { Fragment } from 'react';
import './RepoStats.css';
import posed from 'react-pose';

const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' }
});




const TAB_ACTIVITY_MODIFIER = `tabs-list__tab--active`;

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this._tabsData = props.repos;
    
    this.state = {
      tabs: this._tabsData.map((undefined, i) => ({isActive: (i === 0)})),
      open: false, 
      ulOpen: "ul-1"
    };
  }

  checkDataSet = (event) => {
    if(event.target.dataset.id)
       this.setState({ open: this.state.open === event.target.dataset.id ? false : event.target.dataset.id })
    if(event.target.dataset.name) {
      console.log(event.target.dataset.name)
      this.setState({ ulOpen: this.state.ulOpen === event.target.dataset.name ? false : event.target.dataset.name })
    }
  }

  //toggle = () => this.setState({ isOpen: !this.state.isOpen });
  

  render() {
    console.log(this.props)
    return (
      <dl className="tabs-list" key="tabs-list">
        
      {this._tabsData.map((item, i) => {
      const tabActivityModifier = this.state.tabs[i].isActive ? ` ${TAB_ACTIVITY_MODIFIER}` : ``;
          
      let content =  <div onClick={this.checkDataSet}>
          <h2>Your total repository score: {item.totalRepoScore}%</h2>
          <p> This is accumulated based on following factors: </p>
            <div className="stats__repos">
              <ul data-name="ul-1" className={"stats__header " + (this.state.ulOpen === "ul-1" ? "stats__header--active" : "")}> General
                <li> 
                  <ul className={"stats-breakdown " + (this.state.ulOpen === "ul-1" ? "stats-breakdown--active" : "")}>
                    <li data-id={i+1}> Description: {!item.description ? '0%': '100%'}
                      <Content className="content" pose={this.state.open == i+1 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> Although there isn’t a format for a good repository description, it is a way to provide a summary of a where the project is about and which stack and tools are used. It is show on your main page below the repository name.</div>
                      </Content>
                    </li>
                    <li data-id={i+2}> Readme: {item.repoReadMe < 100 ? "0%": '100%'}
                      <Content className="content" pose={this.state.open == i+2 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> A README file is important to your repository because it tells other people why your project is useful, what they can do with your project, and how they can use it. Without a readme, no one is going to look at you code.
                        </div>
                      </Content>
                    </li>
                    <li data-id={i+3}> Gitignore: {item.repoReadMe < 100 ? "0%": '100%'}
                      <Content className="content" pose={this.state.open == i+3 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> A .gitignore file is used to for GIT to know which files to ignore before making a commit. It is, for example, very important to include your /node_modelus because when running npm install to start your app node will install different versions depending on the computer you work.  
                        </div>
                      </Content>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul data-name="ul-2" className={"stats__header " + (this.state.ulOpen === "ul-2" ? "stats__header--active" : "")}> Branches
              <li>
                <ul className={"stats-breakdown " + (this.state.ulOpen === "ul-2" ? "stats-breakdown--active" : "")}>
                  <li data-id={i+4} className="stats-breakdown__points"> Total score: {item.branchScore.totalScore}%
                  </li>
                    <li data-id={i+5}> Master branch: {item.branchScore.hasMasterBranch}
                      <Content className="content" pose={this.state.open == i+5 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> ‘master’ is considered to be the main branch where the source code of HEAD always reflects a production-ready state.
                        </div>
                      </Content>
                    </li>
                    
                    <li data-id={i+6}> Development branch: {item.branchScore.hasDevelopmentBranch}%:
                      <Content className="content" pose={this.state.open == i+6 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> ‘development’ is considered to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the “integration branch”. 
                        </div>
                      </Content>
                    </li>
                    <li data-id={i+7}> Feature branches: {item.branchScore.hasFeatBranch}%
                      <Content className="content" pose={this.state.open == i+7 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> feature branches are among the ‘supporting branches’. These branches are you to work on features and unlike the main branches, these branches always have a limited life time, since they will be removed eventually.
                        </div>
                      </Content>
                    </li>
                    <li data-id={i+8}> Number of branches: {item.branchScore.hasThreeBranches}%
                      <Content className="content" pose={this.state.open == i+8 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> You should have at least three branches on your repository.
                        </div>
                      </Content>
                    </li>
                    <li data-id={i+9}> Naming: {item.branchScore.useDescriptiveNames}%
                      <Content className="content" pose={this.state.open == i+9 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> All branches, including supporting branches have naming conventions. They should start with master, development, feature, bug, hotfix or junk. 
                        </div>
                      </Content>
                    </li>
                  </ul>  
                </li>
              </ul>
              <ul data-name="ul-3" className={"stats__header " + (this.state.ulOpen === "ul-3" ? "stats__header--active" : "")}> Commits 
                <li>
                  <ul className={"stats-breakdown " + (this.state.ulOpen === "ul-3" ? "stats-breakdown--active" : "")}>
                    <li data-id={i+10} className="stats-breakdown__points"> Total score: {item.commitScore.totalScore}% </li>
                    <li data-id={i+11}> Commits with "and":{item.commitScore.containsAND}%
                      <Content className="content" pose={this.state.open == i+11 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> If you have to add an “and” in your commit message, you’ve already committed too much.
                        </div>
                      </Content>
                    </li>
                    <li data-id={i+12}> Commits with period:{item.commitScore.containsPeriod}%
                      <Content className="content" pose={this.state.open == i+12 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> Don’t end the commit with a period. Save your characters.
                        </div>
                      </Content>
                    </li>
                    <li data-id={i+13}> Length of commits:{item.commitScore.lengthExceeds}%
                      <Content className="content" pose={this.state.open == i+13 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> The commit title should be less than 50 characters. Shorter things are easier to read. 
                        </div>
                      </Content>
                    </li>
                    <li data-id={i+14}> First word of commit starting with uppercase {item.commitScore.upperCase}%
                      <Content className="content" pose={this.state.open == i+14 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> This is seen as generally good conduct by most gitsperts. Sentence case is also more professional looking and easier to read.
                        </div>
                      </Content>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
      ;

          return (
            <React.Fragment key={"tabgroup-" + i}>
              <dt className={"tabs-list__tab" + tabActivityModifier}
                  onClick={this._onTabClick}
                  key={"tablink-" + i}
                  data-id={i}>
                {item.name}
              </dt>
              <dd className="tabs-list__content" key={"tabcontent-" + i}>{content}</dd>
            </React.Fragment>
          );
        })}
        
      </dl>
    );
  }
  
  _onTabClick = (evt) => {
    const targetTabID = +evt.target.dataset.id;
    
    this.setState({
      tabs: this.state.tabs.map((undefined, i) => ({isActive: (targetTabID === i)}))
    });
  }
}

