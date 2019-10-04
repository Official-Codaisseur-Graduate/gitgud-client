import gql from "graphql-tag";

export const GET_USER_DATA = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      username
      score
      averageRepoScore
      profileScore
      repoScore
      previousScores {
        profileScore
        gitScore
        createdAt
      }
      profileStats {
        bio
        email
        isHireable
        location
        name
        websiteUrl
        pinnedRepositories
        picture
      }
      stats {
        totalPinnedRepos
        averageBranchPerRepo
        averageCommitPerBranch
        repoNames {
          name
          owner
          totalRepoScore
          repoReadMe
          gitIgnoreScore
          description
          commitScore {
            lengthExceeds
            containsAND
            containsPeriod
            upperCase
            commitCount
            totalScore
          }
          branchScore {
            hasThreeBranches
            hasMasterBranch
            hasDevelopmentBranch
            hasFeatBranch
            useDescriptiveNames
            totalScore
            branchCount
            properNamesCount
          }
          descriptionDetails {
            tooLong
            tooShort
            includesDependencies
            exists
          }
          nodeModules
        }
      }
    }
  }
`;

export const GET_REPO_DATA = gql`
  query GetRepo($username: String!, $reponame: String!) {
    repository(owner: $username, name: $reponame) {
      name
      gitIgnoreScore
      description
      repoReadMe
      totalRepoScore
      branchScore {
        hasThreeBranches
        hasMasterBranch
        hasDevelopmentBranch
        hasFeatBranch
        useDescriptiveNames
        totalScore
        branchCount
        properNamesCount
      }
      commitScore {
        lengthExceeds
        containsAND
        containsPeriod
        upperCase
        commitCount
        totalScore
      }
      descriptionDetails {
        tooLong
        tooShort
        includesDependencies
        exists
      }
      nodeModules
    }
  }
`;

export const GET_GROUP_DATA = gql`
  query GetGroup($groupName: String) {
    group(groupName: $groupName) {
      groupName
      profiles {
        userName
        profileScore
        reposScore
      }
    }
  }
`;
