let branchStats = {
  hasThreeBranches: 0,
  hasMasterBranch: false,
  hasDevelopmentBranch: false,
  hasFeatBranch: false,
  useDescriptiveNames: 0
};

// in percentages
let branchScore = {
  hasThreeBranches: 0,
  hasMasterBranch: 0,
  hasDevelopmentBranch: 0,
  hasFeatBranch: 0,
  useDescriptiveNames: 0,
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
  branchStats.hasThreeBranches >= 3 ? (branchScore.hasThreeBranches = Math.floor((7/7)*100)) : null;
  branchStats.hasMasterBranch === true ? (branchScore.hasMasterBranch = Math.floor((3/3)*100)) : null;
  branchStats.hasDevelopmentBranch === true ? (branchScore.hasDevelopmentBranch = Math.floor((3/3)*100)) : null;
  branchStats.hasFeatBranch === true ? (branchScore.hasFeatBranch = Math.floor((3/3)*100)) : null;

  branchScore.useDescriptiveNames = Math.floor(((8 - branchStats.useDescriptiveNames)/8)*100);
  branchScore.useDescriptiveNames < 0 ? (branchScore.useDescriptiveNames = 0) : null;

};

const totalScoreCalculator = (branchScore) => {
  const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
  const totalScoreCalc = Object.values(branchScore).splice(0,5)
  branchScore.totalScore = Math.floor(average(totalScoreCalc))
}

export const branchValidation = (hasThreeBranches, branchNamePlusCommitCount) => {

  branchStats.hasThreeBranches = hasThreeBranches;
  
  
  const arrayOfBranchNames = branchNamePlusCommitCount.map(
    branch => branch.branchName
  );
  
    
  arrayOfBranchNames.map(name => {
    
    const featName = name.split("/")[0];
    
    featName.includes("master" || "Master")
      ? (branchStats.hasMasterBranch = true)
      : null;
    featName.includes("dev" || "Dev")
      ? (branchStats.hasDevelopmentBranch = true)
      : null;
    featName.includes("feat" || "Feat" || "feature" || "Feature")
      ? (branchStats.hasFeatBranch = true)
      : null;
      
    descriptiveNamingArray.includes(featName) ? null :  (branchStats.useDescriptiveNames += 1) ;
  });
  scoreCalculator();
 
  totalScoreCalculator(branchScore)
  
  return { branchStats, branchScore };
};
