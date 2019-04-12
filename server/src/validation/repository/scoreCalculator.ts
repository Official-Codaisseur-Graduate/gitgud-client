

export const scoreCalculator = (commitScore, branchScore, reproDescription, reproReadme) => {
  const commit = commitScore.totalScore*(35/100)
  const branch = branchScore.totalScore*(24/100)
  const readmePlusDescription = (reproReadme || reproDescription ? 50 : 
  reproReadme && reproDescription ? 100 : 0)*(25/100)
  const gitIgnore = 0*(16/100)

  const totalGitUseScore = () => {
    return commit + branch + readmePlusDescription + gitIgnore
  }
  const totalScore = totalGitUseScore()
  return totalScore
}

