import { createApolloFetch } from "apollo-fetch";
import * as face from "face-detector";

const token = "b58cc3cb3dffa3e3363b8c349c57d6a03ef2840f";

export const analizeProfile = (username: string): any => {
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
              user(login: "${username}") {
                avatarUrl
                bio
                email
                isHireable
                location
                name
                websiteUrl
                pinnedRepositories {
                    totalCount
                }
              } 
            }`
  })
    .then(res => {
      const user = res.data.user;
      const image = `${user.avatarUrl}`;
      let score = 0;
      let profileStats = {
        bio: true,
        email: true,
        isHireable: true,
        location: true,
        name: true,
        websiteUrl: true,
        pinnedRepositories: true,
        picture: true
      };

      const data1 = new Promise(resolve => {
        user.bio ? (score += 5) : (profileStats.bio = false);
        user.email ? (score += 5) : (profileStats.email = false);
        user.isHireable ? (score += 5) : (profileStats.isHireable = false);
        user.location ? (score += 5) : (profileStats.location = false);
        user.name ? (score += 5) : (profileStats.name = false);
        user.websiteUrl ? (score += 5) : (profileStats.websiteUrl = false);
        user.pinnedRepositories.totalCount > 0
          ? (score += 5)
          : (profileStats.pinnedRepositories = false);
        resolve();
      });

      const data2 = new Promise(resolve => {
        face.detect(image, function(result) {
          result > 0 ? (score += 5) : (profileStats.picture = false);
          resolve();
        });
      });

      return Promise.all([data2, data1]).then(() => {
        return { username, score, profileStats };
      });
    })
    .catch(e => console.log(e));
};
