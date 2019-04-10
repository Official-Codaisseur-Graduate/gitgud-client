import {createApolloFetch} from 'apollo-fetch'
import { token } from '../index'


export const fetchData = (username) => {

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
          user(login: "${username}") {
            id
            name
            avatarUrl
          } 
        }`,
      }).then(res => {
        console.log(res.data);
        return res.data
      });
}


