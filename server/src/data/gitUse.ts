import {createApolloFetch} from 'apollo-fetch'
// import { token } from '../index'
import { generalReproValidation } from '../validation/generalRepros'

const token = 'de4f17275882a741779984364452b82c148e274c'

export const fetchGeneralData = (username) => {

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
          user(login: ${username}) {
            id
            pinnedRepositories(first: 5) {
              totalCount
              edges {
                node {
                  id
                  name
                  description
                  refs(refPrefix: "refs/heads/", first: 20) {
                    totalCount
                    edges {
                      node {
                        branchName: name
                        target {
                          ... on Commit {
                            history(first: 0) {
                              totalCount
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
        
          const totalPinnedRepros = res.data.user.pinnedRepositories.totalCount
          const reproPlusBranchCount = res.data.user.pinnedRepositories.edges.map(repro => {
            const reproName = repro.node.name
            const branchCount = repro.node.refs.totalCount
            return {reproName, branchCount}
          })
          const branchNamePlusCommitCount = res.data.user.pinnedRepositories.edges.map(repro => {
            return repro.node.refs.edges.map(branch => {
              const branchName = branch.node.branchName
              const commitCount = branch.node.target.history.totalCount
              return {branchName, commitCount}
            })
          })

          // console.log(totalPinnedRepros, '- totalPinnenRepro')
          // console.log(reproPlusBranchCount, '- reproPlusBranchCount')
          // console.log(branchNamePlusCommitCount, '-branchNamePlusCommitCount')
          const {averageBranchPerRepro, averageCommitPerBranch} = generalReproValidation(totalPinnedRepros, reproPlusBranchCount, branchNamePlusCommitCount)


          // console.log(totalPinnedRepros, averageBranchPerRepro, averageCommitPerBranch)
        return {totalPinnedRepros, averageBranchPerRepro, averageCommitPerBranch}
      });
}

fetchGeneralData('vdegraaf')

