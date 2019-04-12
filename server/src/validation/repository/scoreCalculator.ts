export const scoreCalculator = (
  commitScore,
  branchScore,
  repoDescription,
  repoReadme,
  gitIgnore
) => {
  
  const commit = commitScore.totalScore * (35 / 100);
  const branch = branchScore.totalScore * (24 / 100);
  const readmePlusDescription =
    (repoReadme || repoDescription
      ? 50
      : repoReadme && repoDescription
      ? 100
      : 0) *
    (25 / 100);
  const gitIgnoreScore = gitIgnore * (16 / 100);

  const totalGitUseScore = () => {
    return commit + branch + readmePlusDescription + gitIgnoreScore;
  };
  const totalScore = totalGitUseScore();
  return totalScore;
};
