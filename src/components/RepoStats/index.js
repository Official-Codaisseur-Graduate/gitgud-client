import React from 'react';
import { Link } from "react-router-dom"
import posed from 'react-pose';

import './RepoStats.css';

const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' }
});

const TAB_ACTIVITY_MODIFIER = `tabs-list__tab--active`;

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this._tabsData = props.repos;
    this.state = {
      tabs: this._tabsData.map((element, i) => ({ isActive: (i === 0) })),
      open: false,
      ulOpen: "ul-1"
    };
  }

  checkDataSet = (event) => {
    if (event.target.dataset.id)
      this.setState({ open: this.state.open === event.target.dataset.id ? false : +event.target.dataset.id })
    if (event.target.dataset.name) {
      this.setState({ ulOpen: this.state.ulOpen === event.target.dataset.name ? event.target.dataset.name : event.target.dataset.name })
    }
  }

  render() {
    return (
      <dl className="tabs-list" key="tabs-list">
        {this._tabsData.map((item, i) => {
          const tabActivityModifier = this.state.tabs[i].isActive ? ` ${TAB_ACTIVITY_MODIFIER}` : ``;
          let content = <div onClick={this.checkDataSet}>
            <h3>Total Repository score: {item.totalRepoScore}%</h3>
            <p className="stats__description"> This is accumulated based on following factors: </p>
            <div className="stats__repos">
              <ul data-name="ul-1" className={"stats__header " + (this.state.ulOpen === "ul-1" ? "stats__header--active" : "")}> General
                <li>
                  <ul className={"stats-breakdown " + (this.state.ulOpen === "ul-1" ? "stats-breakdown--active" : "")}>
                    <li data-id={i + 1} className={this.state.open === i + 1 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Description: {`${item.description}%` }
                      <Content className="content" pose={this.state.open === i + 1 ? 'open' : 'closed'}>
                        {/* <div className="content-wrapper"> Although there isn’t a format for a good repository description, it is a way to provide a summary of a where the project is about and which stack and tools are used. It is shown on your main page below the repository name.</div> */}
                        { !item.descriptionDetails.exists ? <div className="content-wrapper">Providing a description is important.</div> : null}
                        { item.descriptionDetails.tooLong ? <div className="content-wrapper">Description is too long.</div> : null}
                        { item.descriptionDetails.tooShort ? <div className="content-wrapper">Description is too short.</div> : null}
                        { !item.descriptionDetails.includesDependencies ? <div className="content-wrapper">Description should include names of the most relevant dependencies you used.</div> : null}
                        { !item.descriptionDetails.tooShort && !item.descriptionDetails.tooLong? <div className="content-wrapper">Although there isn’t a format for a good repository description, it is a way to provide a summary of a where the project is about and which stack and tools are used.</div> : null}
                      <Link to={`/wiki/general`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 2} className={this.state.open === i + 2 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Readme: {item.repoReadMe < 100 ? "0%" : '100%'}
                      <Content className="content" pose={this.state.open === i + 2 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> A README file is important to your repository because it tells other people why your project is useful, what they can do with your project, and how they can use it. Without a readme, no one is going to look at you code.
                        </div>
                        <Link to={`/wiki/general`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 3} className={this.state.open === i + 3 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Gitignore: {item.gitIgnoreScore < 100 ? "0%" : '100%'}
                      <Content className="content" pose={this.state.open === i + 3 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> A .gitignore file is used to for GIT to know which files to ignore before making a commit. It is, for example, very important to include your /node_modelus because when running npm install to start your app node will install different versions depending on the computer you work.
                        </div>
                        <Link to={`/wiki/general`}>Learn more</Link>
                      </Content>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul data-name="ul-2" className={"stats__header " + (this.state.ulOpen === "ul-2" ? "stats__header--active" : "")}> Branches
              <li>
                  <ul className={"stats-breakdown " + (this.state.ulOpen === "ul-2" ? "stats-breakdown--active" : "")}>
                    <li data-id={i + 5} className={this.state.open === i + 5 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Master branch: {item.branchScore.hasMasterBranch}%
                      <Content className="content" pose={this.state.open === i + 5 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> ‘master’ is considered to be the main branch where the source code of HEAD always reflects a production-ready state.
                        </div>
                        <Link to={`/wiki/branches`}>Learn more</Link>
                      </Content>
                    </li>

                    <li data-id={i + 6} className={this.state.open === i + 6 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Development branch: {item.branchScore.hasDevelopmentBranch}%:
                      <Content className="content" pose={this.state.open === i + 6 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> ‘development’ is considered to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the “integration branch”.
                        </div>
                        <Link to={`/wiki/branches`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 7} className={this.state.open === i + 7 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Feature branches: {item.branchScore.hasFeatBranch}%
                      <Content className="content" pose={this.state.open === i + 7 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> feature branches are among the ‘supporting branches’. These branches are you to work on features and unlike the main branches, these branches always have a limited life time, since they will be removed eventually.
                        </div>
                        <Link to={`/wiki/branches`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 8} className={this.state.open === i + 8 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Number of branches: {item.branchScore.hasThreeBranches}%
                      <Content className="content" pose={this.state.open === i + 8 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> You should have at least three branches on your repository.
                        </div>
                        <Link to={`/wiki/branches`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 9} className={this.state.open === i + 9 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Proper branch names: {item.branchScore.useDescriptiveNames}%
                      <Content className="content" pose={this.state.open === i + 9 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> All branches, including supporting branches have naming conventions. They should start with master, development, feature, bug, hotfix or junk.
                        </div>
                        <Link to={`/wiki/branches`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 4} className="stats-breakdown__points"> Total branches score: {item.branchScore.totalScore}%
                  </li>
                  </ul>
                </li>
              </ul>
              <ul data-name="ul-3" className={"stats__header " + (this.state.ulOpen === "ul-3" ? "stats__header--active" : "")}> Commits
                <li>
                  <ul className={"stats-breakdown " + (this.state.ulOpen === "ul-3" ? "stats-breakdown--active" : "")}>
                    <li data-id={i + 11} className={this.state.open === i + 11 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Commits with "and": {item.commitScore.containsAND}%
                      <Content className="content" pose={this.state.open === i + 11 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> If you have to add an “and” in your commit message, you’ve already committed too much.
                        </div>
                        <Link to={`/wiki/commits`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 12} className={this.state.open === i + 12 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Commits with period: {item.commitScore.containsPeriod}%
                      <Content className="content" pose={this.state.open === i + 12 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> Don’t end the commit with a period. Save your characters.
                        </div>
                        <Link to={`/wiki/commits`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 13} className={this.state.open === i + 13 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> Length of commits: {item.commitScore.lengthExceeds}%
                      <Content className="content" pose={this.state.open === i + 13 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> The commit title should be less than 50 characters. Shorter things are easier to read.
                        </div>
                        <Link to={`/wiki/commits`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 14} className={this.state.open === i + 14 ? 'stats-breakdown__item--active' : 'stats-breakdown__item'}> First word of commit starting with uppercase {item.commitScore.upperCase}%
                      <Content className="content" pose={this.state.open === i + 14 ? 'open' : 'closed'}>
                        <div className="content-wrapper"> This is seen as generally good conduct by most gitsperts. Sentence case is also more professional looking and easier to read.
                        </div>
                        <Link to={`/wiki/commits`}>Learn more</Link>
                      </Content>
                    </li>
                    <li data-id={i + 10} className="stats-breakdown__points"> Total commits score: {item.commitScore.totalScore}% </li>
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
      tabs: this.state.tabs.map((element, i) => ({ isActive: (targetTabID === i) }))
    });
  }
}

