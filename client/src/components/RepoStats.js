import React, { Fragment } from 'react';
import posed from 'react-pose';
import './Accordion.css';

const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' }
})

export default class ReposAccordion extends React.Component {
  state = { open: false };

  render() {
    const { open } = this.state;

    return (
      <Fragment>
        {this.props.repos.map((repo, i) => (
          <Fragment>
            <h2
              className="title"
              onClick={() => this.setState({ open: open === i ? false : i })}
            >
              {repo.name}
            </h2>
            <Content className="content" pose={open === i ? 'open' : 'closed'}>
              <div className="content-wrapper">
              <p> total score of this repository: {repo.totalRepoScore} </p>

              </div>
            </Content>
          </Fragment>
        ))}
      </Fragment>
    );
  }
}
