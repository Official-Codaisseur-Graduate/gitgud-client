export const scoreCalculator = (
  commitScore,
  branchScore,
  repoDescription,
  repoReadme
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
  const gitIgnore = 0 * (16 / 100);

  const totalGitUseScore = () => {
    return commit + branch + readmePlusDescription + gitIgnore;
  };
  const totalScore = totalGitUseScore();
  return totalScore;
};
