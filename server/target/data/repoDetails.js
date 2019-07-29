"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_fetch_1 = require("apollo-fetch");
const commits_1 = require("../validation/repository/commits");
const branches_1 = require("../validation/repository/branches");
const scoreCalculator_1 = require("../validation/repository/scoreCalculator");
const gitignore_1 = require("../validation/repository/gitignore");
const token = process.env.GITHUB_ACCESS_TOKEN;
exports.fetchRepoData = (username, repoName) => {
    const fetch = apollo_fetch_1.createApolloFetch({
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
        object(expression: "master:") {
          ... on Tree {
            entries {
              name
              oid
            }
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
        console.log('REPO DATA=', res.data);
        const name = res.data.repository.name;
        const createdAt = res.data.repository.createdAt;
        const entries = res.data.repository.object.entries;
        const repoDescription = res.data.repository.description
            ? res.data.repository.description
            : "";
        const branchCount = res.data.repository.refs.totalCount;
        const branchNamePlusCommitCount = res.data.repository.refs.edges.map(branch => {
            const branchName = branch.node.branchName;
            const commitCount = branch.node.target.history.totalCount;
            return { branchName, commitCount };
        });
        const fileCheck = res.data.repository.object.entries;
        const commitMessages = res.data.repository.refs.edges.map(branch => {
            return branch.node.target.history.edges.map(commit => {
                const messages = commit.node.message;
                return messages;
            });
        });
        const commitScore = commits_1.commitValidation(commitMessages);
        const branchScore = branches_1.branchValidation(branchCount, branchNamePlusCommitCount);
        const { gitIgnoreScore, repoReadMe } = gitignore_1.fileValidation(fileCheck);
        const totalRepoScore = Math.round(scoreCalculator_1.scoreCalculator(commitScore, branchScore, repoDescription, repoReadMe, gitIgnoreScore));
        const description = repoDescription ? true : false;
        return {
            commitScore,
            branchScore,
            totalRepoScore,
            repoReadMe,
            gitIgnoreScore,
            description,
            name,
            createdAt,
            entries
        };
    })
        .catch(e => e);
};
//# sourceMappingURL=repoDetails.js.map