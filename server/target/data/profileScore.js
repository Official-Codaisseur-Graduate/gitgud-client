"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_fetch_1 = require("apollo-fetch");
const face = require("face-detector");
const token = process.env.GITHUB_ACCESS_TOKEN;
exports.analizeProfile = (username) => {
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
                ? (score += 10)
                : (profileStats.pinnedRepositories = false);
            resolve();
        });
        const data2 = new Promise(resolve => {
            face.detect(image, function (result) {
                result > 0 ? (score += 10) : (profileStats.picture = false);
                resolve();
            });
        });
        return Promise.all([data1, data2]).then(() => {
            return { username, score, profileStats };
        });
    })
        .catch(e => e);
};
//# sourceMappingURL=profileScore.js.map