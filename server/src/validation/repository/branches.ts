
let branchStats = {
  branchCount: 0,
  masterBranch: false,
  developmentBranch: false,
  featBranch: false,
  descriptiveNamingErrors: 0
}

let branchScore = {
  branchCount: 0,
  masterBranch: 0,
  developmentBranch: 0,
  featBranch: 0,
  descriptiveNamingErrors: 0
}

const descriptiveNamingArray = ['feat', 'Feat', 'feature', 'Feature', 'master', 'Master', 'bug', 'Bug', 'hotFix', 'HotFix', 'junk', 'Junk']

const scoreCalculator = () => {
  branchStats.branchCount >= 3 ? branchScore.branchCount = 7 : null
  branchStats.masterBranch === true ? branchScore.masterBranch = 3 : null
  branchStats.developmentBranch === true ? branchScore.developmentBranch = 3 : null
  branchStats.featBranch === true ? branchScore.featBranch = 3 : null
  branchScore.descriptiveNamingErrors = (8 - branchStats.descriptiveNamingErrors)
  branchScore.descriptiveNamingErrors < 0 ? branchScore.descriptiveNamingErrors = 0 : null

}


export const branchValidation = (branchCount, branchNamePlusCommitCount) => {
  console.log(branchCount, branchNamePlusCommitCount, 'im the branchnamePlusCommitCount')

  branchStats.branchCount = branchCount

  const arrayOfBranchNames = branchNamePlusCommitCount.map(branch => branch.branchName)

  arrayOfBranchNames.map(name => {
    const featName = name.split('/')[0]
    featName.includes('master' || 'Master') ? branchStats.masterBranch = true : null
    featName.includes('development' || 'Development') ? branchStats.developmentBranch = true : null
    featName.includes('feat' || 'Feat' || 'feature' || 'Feature') ? branchStats.featBranch = true : null
    console.log(featName, 'im featName')
    descriptiveNamingArray.includes(featName) ? null : branchStats.descriptiveNamingErrors += 1

  })
  scoreCalculator()
  console.log(branchStats, branchScore)
  return { branchStats, branchScore }

}