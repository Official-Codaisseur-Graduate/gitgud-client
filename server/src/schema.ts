import { makeExecutableSchema } from "graphql-tools";
//import { getRepository } from "typeorm";
// import {fetchReproData} from './data/reproDetails'
// import { fetchData } from './data/getData'
import {analizeProfile} from './data/profileScore'

const typeDefs = `
  type Query {
    user(username: String): User
  }

  type User {
    username: String
    score: Int
    profileStats: Profile
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
`;

const resolvers = {
  Query: {
    user: async(_, { username }, __, ___) => {
      const data = await analizeProfile(username)
      console.log(data)
        return data
  },
}
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;



