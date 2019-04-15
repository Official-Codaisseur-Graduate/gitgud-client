let branchStats = {
  branchCount: 0,
  masterBranch: false,
  developmentBranch: false,
  featBranch: false,
  descriptiveNamingErrors: 0
};

// in percentages
let branchScore = {
  branchCount: 0,
  masterBranch: 0,
  developmentBranch: 0,
  featBranch: 0,
  descriptiveNamingErrors: 0,
  totalScore: 0
};

const descriptiveNamingArray = [
  "feat",
  "Feat",
  "feature",
  "Feature",
  "master",
  "Master",
  "bug",
  "Bug",
  "hotFix",
  "HotFix",
  "junk",
  "Junk"
];

const scoreCalculator = () => {
  branchStats.branchCount >= 3 ? (branchScore.branchCount = Math.floor((7/7)*100)) : null;
  branchStats.masterBranch === true ? (branchScore.masterBranch = Math.floor((3/3)*100)) : null;
  branchStats.developmentBranch === true ? (branchScore.developmentBranch = Math.floor((3/3)*100)) : null;
  branchStats.featBranch === true ? (branchScore.featBranch = Math.floor((3/3)*100)) : null;
  branchScore.descriptiveNamingErrors = Math.floor(((8 - branchStats.descriptiveNamingErrors)/8)*100);
  branchScore.descriptiveNamingErrors < 0 ? (branchScore.descriptiveNamingErrors = 0) : null;

  const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
  const totalScoreCalc = Object.values(branchScore)
  branchScore.totalScore = Math.floor(average(totalScoreCalc))

};

export const branchValidation = (branchCount, branchNamePlusCommitCount) => {

  branchStats.branchCount = branchCount;

  const arrayOfBranchNames = branchNamePlusCommitCount.map(
    branch => branch.branchName
  );
    
  arrayOfBranchNames.map(name => {
    const featName = name.split("/")[0];
    featName.includes("master" || "Master")
      ? (branchStats.masterBranch = true)
      : null;
    featName.includes("dev" || "Dev")
      ? (branchStats.developmentBranch = true)
      : null;
    featName.includes("feat" || "Feat" || "feature" || "Feature")
      ? (branchStats.featBranch = true)
      : null;
    descriptiveNamingArray.includes(featName)
      ? null
      : (branchStats.descriptiveNamingErrors += 1);
  });
  scoreCalculator();
  
  return { branchStats, branchScore };
};
