let commitStats = {
  lengthExceeds: 0,
  containsAND: 0,
  constainsPeriod: 0,
  upperCase: 0
};

let commitScore = {
  lengthExceeds: 0,
  containsAND: 0,
  containsPeriod: 0,
  upperCase: 0
};

const scoreCalculator = (data, name, commitCount) => {
  const dataPerc = (data / commitCount - 1) * -1;

  dataPerc > 0.33 ? (commitScore[name] = 4) : (commitScore[name] = 0);
  dataPerc > 0.66
    ? (commitScore[name] = 7)
    : (commitScore[name] = commitScore[name]);
};

export const commitValidation = commitMessages => {
  // total commits
  const commitCount = commitMessages
    .map(branch => branch.length)
    .reduce((partial_sum, a) => partial_sum + a);

  // check length
  const lengthCount = commitMessages.map(branch =>
    branch.map(commit => (commit.length > 50 ? 1 : 0))
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
    branch.map(message => (message.includes("and") ? 1 : 0))
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
    branch.map(message => (message.slice(-1) === "." ? 1 : 0))
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
    branch.map(word => (isUpperCase(word) ? 0 : 1))
  );
  const upperCaseCount = upperCaseCheck.map(branch =>
    branch.reduce((partial_sum, a) => partial_sum + a)
  );
  commitStats.upperCase = upperCaseCount.reduce(
    (partial_sum, a) => partial_sum + a
  );
  scoreCalculator(commitStats.upperCase, "upperCase", commitCount);

  // console.log(commitStats, 'im the commitlength')
  // console.log(commitScore, 'im the score')

  return { commitStats, commitScore };
};
