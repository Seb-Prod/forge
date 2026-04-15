const execGit = require("../core/execGit");

function getLocalBranches(cli, gitRoot) {
  const output = execGit(cli, "git branch --format='%(refname:short)'", {
    cwd: gitRoot,
  });

  return [...new Set(
    output.split("\n").filter(Boolean)
  )];
}

module.exports = getLocalBranches;