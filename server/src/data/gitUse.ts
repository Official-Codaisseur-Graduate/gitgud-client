import { createApolloFetch } from "apollo-fetch";
import { generalRepoValidation } from "../validation/generalRepos";

const token = process.env.GITHUB_ACCESS_TOKEN;

export const fetchGeneralData = username => {
  const fetch = createApolloFetch({
    uri: "https://api.github.com/graphql"
  });

  fetch.use(({ options }, next) => {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["Authorization"] = `bearer ${token}`;
    next();
  });

  return fetch({
    query: `{
          user(login: "${username}") {
            id
            pinnedRepositories(first: 5) {
              totalCount
              edges {
                node {
                  id
                  name
                  owner {
                    login
                  }
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
        `
  }).then(res => {

    // console.log(`REPOS RESULT`, res.data.user.pinnedRepositories.edges);
    // console.log(res.data.user.pinnedRepositories.totalCount);
    const totalPinnedRepos = res.data.user.pinnedRepositories.totalCount;
    // console.log(res.data.user.pinnedRepositories.totalCount + ' total count')
    if (totalPinnedRepos === 0) {
      return 0;
    } else {
      const repoPlusBranchCount = res.data.user.pinnedRepositories.edges.map(
        repo => {
          const repoName = repo.node.name;
          const branchCount = repo.node.refs.totalCount;
          const repoOwner = repo.node.owner.login
          return { repoName, repoOwner, branchCount };
        }
      );
      const branchNamePlusCommitCount = res.data.user.pinnedRepositories.edges.map(
        repo => {
          return repo.node.refs.edges.map(branch => {
            const branchName = branch.node.branchName;
            const commitCount = branch.node.target.history.totalCount;
            return { branchName, commitCount };
          });
        }
      );

      // console.log(totalPinnedRepos, '- totalPinnenRepo')
      // console.log(repoPlusBranchCount, '- repoPlusBranchCount')
      // console.log(branchNamePlusCommitCount, '-branchNamePlusCommitCount')
      const {
        averageBranchPerRepo,
        averageCommitPerBranch
      } = generalRepoValidation(
        totalPinnedRepos,
        repoPlusBranchCount,
        branchNamePlusCommitCount
      );

      // console.log(totalPinnedRepos, averageBranchPerRepo, averageCommitPerBranch)
      const repoNames = repoPlusBranchCount.map(rep => {
        return { name: rep.repoName, 
          owner: rep.repoOwner }
      });

      return {
        totalPinnedRepos,
        averageBranchPerRepo,
        averageCommitPerBranch,
        repoNames
      };
    }
  })
  .catch(e => e)
};
