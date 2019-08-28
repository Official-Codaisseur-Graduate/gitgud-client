import React, { Component } from 'react'
import RepoAccordion from './Accordion'


export default class GeneralAccordionContainer extends Component {
  state = {
    accordionItems: [
      {
        id: 1,
        button: `Description: ${this.props.description ? 100 : 0}`,
        panel: "Although there isn’t a format for a good repository description, it is a way to provide a summary of a where the project is about and which stack and tools are used. It is show on your main page below the repository name."
      }, {
        id: 2,
        button: `Readme: ${this.props.readme}`,
        panel: " README file is important to your repository because it tells other people why your project is useful, what they can do with your project, and how they can use it. Without a readme, no one is going to look at you code."
      }, {
        id: 3,
        button: `Gitignore:  ${this.props.gitignore}`,
        panel: "A  .gitignore file is used to for GIT to know which files to ignore before making a commit. It is, for example, very important to include your /node_modelus because when running npm install to start your app node will install different versions depending on the computer you work."
      }
    ]
  }

  render() {

    return (
      this.state.accordionItems.map(accordionItem => {
        return <RepoAccordion
          key={accordionItem.id}
          button={accordionItem.button}
          panel={accordionItem.panel}
        />
      })
    )
  }
}
