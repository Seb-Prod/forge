const resolveGitRoot = require("./commands/resolveGitRoot");
const getCurrentBranch = require("./commands/currentBranch");
const stageFiles = require("./commands/stageFiles");
const commitChanges = require("./commands/commitChanges");
const getGitLog = require("./commands/gitLog");
const resolveHeadForBranch = require("./commands/resolveHead");
const fetchRemote = require("./commands/fetchRemote");
const squashBranch = require("./commands/squashBranch");
const getParentBranch = require("./commands/parentBranch");
const isWorkingTreeClean = require("./commands/isWorkingTreeClean");
const pushBranch = require("./commands/pushBranch");

const getLocalBranches = require("./branches/local");
const getRemoteBranches = require("./branches/remote");

function createGitUtils(cli) {
  return {
    resolveGitRoot: (cwd) => resolveGitRoot(cli, cwd),
    getCurrentBranch: (gitRoot) => getCurrentBranch(cli, gitRoot),
    stageFiles: (gitRoot, files) => stageFiles(cli, gitRoot, files),
    commitChanges: (gitRoot, msg) => commitChanges(cli, gitRoot, msg),
    getGitLog: (gitRoot) => getGitLog(cli, gitRoot),
    resolveHeadForBranch: (gitRoot, branch) =>
      resolveHeadForBranch(cli, gitRoot, branch),
    fetchRemote: (gitRoot) => fetchRemote(cli, gitRoot),
    squashBranch: (gitRoot, baseBranch) =>
      squashBranch(cli, gitRoot, baseBranch),
    getParentBranch: (
      gitRoot,
      currentBranch, // ← ajout
    ) => getParentBranch(cli, gitRoot, currentBranch),
    isWorkingTreeClean: (gitRoot) => isWorkingTreeClean(cli, gitRoot),
    pushBranch: (gitRoot, branch, remote) =>
      pushBranch(cli, gitRoot, branch, remote),

    getLocalBranches: (gitRoot) => getLocalBranches(cli, gitRoot),
    getRemoteBranches: (gitRoot) => getRemoteBranches(cli, gitRoot),
  };
}

module.exports = { createGitUtils };
