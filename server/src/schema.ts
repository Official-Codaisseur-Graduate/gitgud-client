import { makeExecutableSchema } from "graphql-tools";
import { getRepository } from "typeorm";
import { fetchRepoData } from "./data/repoDetails";
import { analyzeProfile } from "./data/profileScore";
import { fetchGeneralData } from "./data/gitUse";
import { Score } from "./score/entity";

const typeDefs = `

  type Query {
    user(username: String): User
    repository(owner: String, name: String): Repository
  }
  type User {
    username: String
    score: Int
    profileScore: Int
    averageRepoScore: Int
    repoScore: Int
    profileStats: Profile
    stats: Stats
    previousScores: [History]
  }

  type History {
    id: Int
    userName: String
    profileScore: Int
    gitScore: Int
    createdAt: String
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
      console.log('USERNAME!!', username)
      const data = await analyzeProfile(username);
      const gitUse = await fetchGeneralData(username);
      data.stats = gitUse;
      let averageRepoScore = 0;
      let lastScore;
      const userScores = await Score.find({ userName: username });

      if (userScores.length > 0) {
        data.previousScores = userScores;
        lastScore = userScores[userScores.length - 1];
      } else {
        lastScore = null;
      }

      const score = new Score();
      score.profileScore = data.score;
      score.gitScore = 0;
      score.userName = username;

      if (data.stats.totalPinnedRepos > 0) {
        const promises = data.stats.repoNames.map(async (repo, i) => {
          const TEST = await fetchRepoData(repo.owner, repo.name).then(
            repoData => {
              if (!repoData) throw new Error();

              averageRepoScore += repoData.totalRepoScore;
              data.stats.repoNames[i] = {
                ...data.stats.repoNames[i],
                commitScore: { ...repoData.commitScore },
                branchScore: { ...repoData.branchScore },
                description: repoData.description,
                gitIgnoreScore: repoData.gitIgnoreScore,
                repoReadMe: repoData.repoReadMe,
                totalRepoScore: repoData.totalRepoScore
              };
            }
          );

          return TEST;
        });

        return Promise.all(promises).then(() => {
          data.profileScore = data.score;
          data.averageRepoScore = Math.round(
            averageRepoScore / data.stats.repoNames.length
          );
          data.repoScore = Math.round(data.averageRepoScore / 2);
          data.score += data.repoScore;
          data.score = Math.round(data.score);
          score.gitScore = data.repoScore;
          saveScoreIfUpdated(score, lastScore);
          return data;
        });
      }

      saveScoreIfUpdated(score, lastScore);
      data.profileScore = data.score;
      data.repoScore = 0;
      return data;
    },
    repository: async (_, args , __, ___,)=> {
       const data = await fetchRepoData(args.owner, args.name)
       console.log('THIS IS DATA', data)

       return data
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const saveScoreIfUpdated = (score, lastScore) => {
  if (!lastScore) {
    getRepository(Score).save(score);
  } else {
    const newScore = score.gitScore + score.profileScore;
    const oldScoreValue = lastScore.gitScore + lastScore.profileScore;
    if (
      new Date().toLocaleDateString() ===
        lastScore.createdAt.toLocaleDateString() &&
      newScore === oldScoreValue
    ) {
      return;
    }
    getRepository(Score).save(score);
  }
};

export default schema;
