import { makeExecutableSchema } from "graphql-tools";
import { fetchRepoData } from "./data/repoDetails";
import { analizeProfile } from "./data/profileScore";
import { fetchGeneralData } from "./data/gitUse";

const typeDefs = `
  type Query {
    user(username: String): User
  }

  type User {
    username: String
    score: Int
    profileScore: Int
    averageRepoScore: Int
    repoScore: Int
    profileStats: Profile
    stats: Stats
  }

  type Profile {
    bio: Boolean
    email: Boolean
    isHireable: Boolean
    location: Boolean
    name: Boolean
    websiteUrl: Boolean
    pinnedRepositories: Boolean
    picture: Boolean
  }

  type Stats {
    totalPinnedRepos: Int
    averageBranchPerRepo: Int
    averageCommitPerBranch: Int
    repoNames: [Repository]
  }

  type Repository {
    name: String
    owner: String
    commitScore: Commit
    branchScore: Branch
    totalRepoScore: Int
    repoReadMe: Int
    gitIgnoreScore: Int
    description: Boolean 
  }

  type Commit {
    lengthExceeds: Int
    containsAND: Int
    containsPeriod: Int
    upperCase: Int
    totalScore: Int
  }

  type Branch {
    hasThreeBranches: Int
    hasMasterBranch: Int
    hasDevelopmentBranch: Int
    hasFeatBranch: Int
    useDescriptiveNames: Int
    totalScore: Int
}

`;

const resolvers = {
  Query: {
    user: async (_, { username }, __, ___) => {
      const data = await analizeProfile(username);
      const gitUse = await fetchGeneralData(username);
      data.stats = gitUse;
      let averageRepoScore = 0;

      if (data.stats.totalPinnedRepos > 0) {
        const promises = data.stats.repoNames.map(async (repo, i) => {
          return fetchRepoData(repo.owner, repo.name).then(repoData => {
            if (!repoData) throw new Error();
            averageRepoScore += repoData.totalRepoScore;
            data.stats.repoNames[i] = {
              ...data.stats.repoNames[i],
              ...repoData
            };
          });
        });

        return Promise.all(promises).then(() => {
          data.profileScore = data.score;
          data.averageRepoScore = Math.round(
            averageRepoScore / data.stats.repoNames.length
          );
          data.repoScore = Math.round(data.averageRepoScore / 2);
          data.score += data.repoScore;
          data.score = Math.round(data.score);

          console.log(data.stats.repoNames);

          return data;
        });
      }
      return data;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
