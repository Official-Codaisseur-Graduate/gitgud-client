import {createApolloFetch} from 'apollo-fetch'
import { token } from '../index'


export const fetchReproData = (username, reproName) => {

    const fetch = createApolloFetch({
        uri: 'https://api.github.com/graphql',
      });

      fetch.use(({ options }, next) => {
        if (!options.headers) {
            options.headers = {};
          }
          options.headers['Authorization'] = `bearer ${token}`;
          next();
});
  
    return fetch({
        query: `{
          repository(owner: ${username}, name: ${reproName}) {
            createdAt
            name
            description
            object(expression: "master:README.md") {
              ... on Blob {
                text
              }
            }
            refs(refPrefix: "refs/heads/", first: 10) {
              totalCount
              edges {
                node {
                  branchName: name
                  target {
                    ... on Commit {
                      history(first: 50) {
                        totalCount
                        edges {
                          node {
                            ... on Commit {
                              message
               
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        
        `,
      }).then(res => {
        
          const reproDescription = res.data.repository.description
          const branchCount = res.data.repository.refs.totalCount
          const reproReadMe = res.data.repository.object.text

          const branchNamePlusCommitCount =  res.data.repository.refs.edges.map(branch => {
            const branchName = branch.node.branchName
            const commitCount = branch.node.target.history.totalCount
            return {branchName, commitCount}
          })

          const commitMessages = res.data.repository.refs.edges.map(branch => {
            return branch.node.target.history.edges.map(commit => {
              const messages = commit.node.message
              return messages
            })
          })
          
          // console.log(reproDescription, branchCount, reproReadMe, branchNamePlusCommitCount, commitMessages)
        return {reproDescription, branchCount, reproReadMe, branchNamePlusCommitCount, commitMessages}
      });
}

fetchReproData('vdegraaf', 'heroGame')
