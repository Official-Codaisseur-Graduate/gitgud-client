import { makeExecutableSchema } from "graphql-tools";
import {fetchRepoData} from './data/repoDetails'

import { analizeProfile } from "./data/profileScore";
import { fetchGeneralData } from "./data/gitUse";

const typeDefs = `
  type Query {
    user(username: String): User
  }

  type User {
    username: String
    score: Int
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
    repoNames: [Repos]
  }

  type Repos {
    name: String
    owner: String
  }
`;

const resolvers = {
  Query: {
    user: async (_, { username }, __, ___) => {
      const data = await analizeProfile(username);
      const gitUse = await fetchGeneralData(username);
      data.stats = gitUse;
      if (data.stats.totalPinnedRepos > 0) {
        data.stats.repoNames.map(async(repo) => {
          const repoData = await fetchRepoData(repo.owner, repo.name)
          if (!repoData) throw new Error
          data.repoNames[repo.name] = repoData
        }) 
      }
      // console.log(repoDetails)
      return data;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
