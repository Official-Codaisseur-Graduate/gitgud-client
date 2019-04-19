"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreCalculator = (commitScore, branchScore, repoDescription, repoReadme, gitIgnore) => {
    const commit = commitScore.totalScore * (35 / 100);
    const branch = branchScore.totalScore * (24 / 100);
    const description = (repoDescription ? 100 : 0) * (10 / 100);
    const readme = (repoReadme ? 100 : 0) * (15 / 100);
    const gitIgnoreScore = gitIgnore * (16 / 100);
    const totalGitUseScore = () => {
        return commit + branch + description + readme + gitIgnoreScore;
    };
    const totalScore = totalGitUseScore();
    return totalScore;
};
//# sourceMappingURL=scoreCalculator.js.map