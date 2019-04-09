import {createApolloFetch} from 'apollo-fetch'

const token = 'a18237b5d2d8558539d1d97dd1620fa1a550e04d'


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


