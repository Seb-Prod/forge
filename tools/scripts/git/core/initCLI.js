const { createCLIContext } = require("../../utils/cli");
const { clearConsole } = require("../../utils/console");
const { printLogo } = require("../../utils/logo");
const { createGitUtils } = require("../utils");


/**
 * Initialise le contexte d'une commande CLI Git : arguments, utilitaires Git,
 * affichage du logo, et fonction de sortie liée à la commande.
 *
 * @param {string[]} argv - Tableau des arguments du processus (`process.argv`).
 * @param {string} [commandName="unknown-command"] - Identifiant de la commande, utilisé dans la sortie JSON standardisée.
 * @returns {CLIInitResult} Le contexte complet prêt à l'emploi dans la commande.
 *
 * @example
 * const { cli, git, cwd, exit } = initCLI(process.argv, "git-squash-branch");
 *
 * const branch = cli.getArgValue("--branch");
 * if (!branch) cli.pushError("Missing --branch");
 * if (cli.hasFatalError) exit({ branch: null, result: false });
 *
 * const gitRoot = git.resolveGitRoot(cwd);
 * const currentBranch = git.getCurrentBranch(gitRoot);
 */
function initCLI(argv, commandName = "unknown-command") {
  /* -- Initialisations -- */
  const cli = createCLIContext(argv, commandName);
  const git = createGitUtils(cli);

  /* -- Nettoyage console -- */
  clearConsole(cli.args);
  printLogo(cli.log, cli.silent);

  /* -- Résolution du répertoire courant -- */
  const cwd = cli.resolveCwd();

  /* -- Récupération des information -- */
  // Détection de la racine du dépôt Git
  const gitRoot = git.resolveGitRoot(cwd);

  // Stop si pas dans un dépôt Git
  if (!gitRoot) cli.exitWithResult({ branch: null, result: false });

  // Récupération de la branche courante
  const currentBranch = git.getCurrentBranch(gitRoot);

  // Récupération de la branhce parent
  const parentBranch = git.getParentBranch(gitRoot, currentBranch);

  return {
    cli,
    git,
    cwd,
    gitRoot,
    currentBranch,
    parentBranch,
  };
}

module.exports = initCLI;
