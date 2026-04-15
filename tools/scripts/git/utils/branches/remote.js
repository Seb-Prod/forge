const execGit = require("../core/execGit");

function getRemoteBranches(cli, gitRoot) {
  const output = execGit(cli, "git branch -r --format='%(refname:short)'", {
    cwd: gitRoot,
  });

  return [...new Set(
    output
      .split("\n")
      .filter(Boolean)
      .filter(b => !b.includes("origin/HEAD"))
  )];
}

module.exports = getRemoteBranches;