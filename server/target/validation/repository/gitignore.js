"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidation = fileCheck => {
    const fileNames = fileCheck.map(file => {
        return file.name;
    });
    let gitIgnoreScore = fileNames.includes(".gitignore") ? 100 : 0;
    if (gitIgnoreScore === 0) {
        fileNames.includes("client" && "server") ? (gitIgnoreScore = 50) : null;
    }
    let repoReadMe = fileNames.map(filename => {
        const file = filename.toLowerCase();
        return file.includes("readme") ? 100 : 0;
    });
    repoReadMe = repoReadMe.includes(100) ? 100 : 0;
    return { gitIgnoreScore, repoReadMe };
};
//# sourceMappingURL=gitignore.js.map