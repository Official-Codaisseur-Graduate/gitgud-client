let commitStats = {
  lengthExceeds: 0,
  containsAND: 0,
  constainsPeriod: 0,
  upperCase: 0
};

// in whole percentages
const commitScore = {
  lengthExceeds: 0,
  containsAND: 0,
  containsPeriod: 0,
  upperCase: 0,
  totalScore: 0
};

const scoreCalculator = (data, name, commitCount) => {
  const dataPerc = Math.round((data / commitCount)*100)
  commitScore[name] = dataPerc

};

const totalScoreCalculator = (commitScore) => {
  const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
  const totalScoreCalc = Object.values(commitScore).splice(0,4)
  commitScore.totalScore = Math.floor(average(totalScoreCalc))
}

const returnToDefault = () => {
  commitStats.lengthExceeds = 0
  commitStats.containsAND = 0
  commitStats.constainsPeriod = 0
  commitStats.upperCase = 0

  
}

export const commitValidation = commitMessages => {
  // total commits
  const commitCount = commitMessages
    .map(branch => branch.length)
    .reduce((partial_sum, a) => partial_sum + a);

  // check length
  const lengthCount = commitMessages.map(branch =>
    branch.map(commit => (commit.length > 50 ? 0 : 1))
  );
  const lengthExceedsCount = lengthCount.map(branch =>
    branch.reduce((partial_sum, a) => partial_sum + a)
  );
 
  commitStats.lengthExceeds = lengthExceedsCount.reduce(
    (partial_sum, a) => partial_sum + a
  );
  scoreCalculator(commitStats.lengthExceeds, "lengthExceeds", commitCount);

  // check AND
  const checkCountBranch = commitMessages.map(branch =>
    branch.map(message => (message.includes("and") ? 0 : 1))
  );
  const checkCountCommit = checkCountBranch.map(branch =>
    branch.reduce((partial_sum, a) => partial_sum + a)
  );
  commitStats.containsAND = checkCountCommit.reduce(
    (partial_sum, a) => partial_sum + a
  );
  scoreCalculator(commitStats.containsAND, "containsAND", commitCount);

  // check Period
  const periodCheck = commitMessages.map(branch =>
    branch.map(message => (message.slice(-1) === "." ? 0 : 1))
  );
  const periodCount = periodCheck.map(branch =>
    branch.reduce((partial_sum, a) => partial_sum + a)
  );
  commitStats.constainsPeriod = periodCount.reduce(
    (partial_sum, a) => partial_sum + a
  );
  scoreCalculator(commitStats.constainsPeriod, "containsPeriod", commitCount);

  // check if Uppercase
  function isUpperCase(str) {
    return str === str.toUpperCase();
  }
  const firstWords = commitMessages.map(branch =>
    branch.map(message => message.split(" ", 2)[0])
  );
  const upperCaseCheck = firstWords.map(branch =>
    branch.map(word => (isUpperCase(word) ? 1 : 0))
  );
  const upperCaseCount = upperCaseCheck.map(branch =>
    branch.reduce((partial_sum, a) => partial_sum + a)
  );
  commitStats.upperCase = upperCaseCount.reduce(
    (partial_sum, a) => partial_sum + a
  );
  scoreCalculator(commitStats.upperCase, "upperCase", commitCount);
  totalScoreCalculator(commitScore)
  
  returnToDefault()
  return commitScore;
};
