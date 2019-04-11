export const generalReproValidation = (
  totalPinnedRepros,
  reproPlusBranchCount,
  branchNamePlusCommitCount
) => {
  const branchCountMap = reproPlusBranchCount.map(repro => {
    return repro.branchCount;
  });
  const branchCount = branchCountMap.reduce(
    (partial_sum, a) => partial_sum + a
  );
  const averageBranchPerRepro = Math.round(branchCount / totalPinnedRepros);

  const commitCount = branchNamePlusCommitCount.map(branches => {
    return branches.map(branch => {
      return branch.commitCount;
    });
  });

  const commitCountMap = commitCount
    .map(count => {
      return count.reduce((partial_sum, a) => partial_sum + a);
    })
    .reduce((partial_sum, a) => partial_sum + a);
  const averageCommitPerBranch = Math.round(commitCountMap / branchCount);

  return { averageBranchPerRepro, averageCommitPerBranch };
};
