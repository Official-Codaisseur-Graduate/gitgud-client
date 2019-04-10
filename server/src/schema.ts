import { makeExecutableSchema } from "graphql-tools";
//import { getRepository } from "typeorm";
// import {fetchReproData} from './data/reproDetails'
import { fetchData } from './data/getData'

const typeDefs = `
  type Query {
    user(username: String): User
  }

  type User {
    id: ID!
    name: String!
    avatarUrl: String!
  }
`;

const resolvers = {
  Query: {
    user: async(_, { username }, __, ___) => {
      const data = await fetchData(username)
        return data.username
  },
}
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;



