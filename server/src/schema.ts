import { makeExecutableSchema } from "graphql-tools";
//import { getRepository } from "typeorm";
// import {fetchReproData} from './data/reproDetails'
// import { fetchData } from './data/getData'
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
    totalPinnedRepros: Int
    averageBranchPerRepro: Int
    averageCommitPerBranch: Int
    repoNames: [String]
  }
`;

const resolvers = {
  Query: {
    user: async (_, { username }, __, ___) => {
      const data = await analizeProfile(username);
      const gitUse = await fetchGeneralData(username);
      console.log(`data`, data);
      console.log(`gituse`, gitUse);
      data.stats = gitUse;
      return data;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
