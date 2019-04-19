"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRepoValidation = (totalPinnedRepos, repoPlusBranchCount, branchNamePlusCommitCount) => {
    const branchCountMap = repoPlusBranchCount.map(repo => {
        return repo.branchCount;
    });
    const branchCount = branchCountMap.reduce((partial_sum, a) => partial_sum + a);
    const averageBranchPerRepo = Math.round(branchCount / totalPinnedRepos);
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
    return { averageBranchPerRepo, averageCommitPerBranch };
};
//# sourceMappingURL=generalRepos.js.map