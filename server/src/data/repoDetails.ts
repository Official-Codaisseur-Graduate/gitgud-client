import { createApolloFetch } from "apollo-fetch";
import { commitValidation } from "../validation/repository/commits";
import { branchValidation } from "../validation/repository/branches";
import { scoreCalculator } from "../validation/repository/scoreCalculator";

const token = process.env.GITHUB_ACCESS_TOKEN;

export const fetchRepoData = (username, repoName) => {
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
          repository(owner: "${username}", name: "${repoName}") {
            createdAt
            name
            description
            object(expression: "master:README.md") {
              ... on Blob {
                text
              }
            }
            refs(refPrefix: "refs/heads/", first: 50) {
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
        
        `
  }).then(res => {
    const repoDescription = res.data.repository.description ? res.data.repository.description : '';
    const branchCount = res.data.repository.refs.totalCount;
    const repoReadMe = res.data.repository.object ? res.data.repository.object.text : ''

    const branchNamePlusCommitCount = res.data.repository.refs.edges.map(
      branch => {
        const branchName = branch.node.branchName;
        const commitCount = branch.node.target.history.totalCount;
        return { branchName, commitCount };
      }
    );

    const commitMessages = res.data.repository.refs.edges.map(branch => {
      return branch.node.target.history.edges.map(commit => {
        const messages = commit.node.message;
        return messages;
      });
    });

    const commitStats = commitValidation(commitMessages);

    const branchStats = branchValidation(
      branchCount,
      branchNamePlusCommitCount
    );

    const totalRepoScore = scoreCalculator(
      commitStats.commitScore,
      branchStats.branchScore,
      repoDescription,
      repoReadMe
    );

    // console.log(repoDescription, branchCount, repoReadMe, branchNamePlusCommitCount, commitMessages)
    return {
      commitStats,
      branchStats,
      totalRepoScore
    };
  });
};
