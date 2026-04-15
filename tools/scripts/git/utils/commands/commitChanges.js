const execGit = require("../core/execGit");

/**
 * Crée un commit Git avec les fichiers actuellement stagés.
 *
 * Vérifie au préalable qu'il existe bien des changements indexés (staged)
 * avant de lancer le commit. Lève une erreur explicite si ce n'est pas le cas.
 *
 * @param {object} cli         - Instance CLI exposant au minimum une méthode `log(message: string)`
 * @param {string} gitRoot     - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} message     - Message du commit (sera échappé via JSON.stringify)
 *
 * @returns {void}
 *
 * @throws {Error} "Nothing to commit" — si aucun fichier n'est indexé dans le staging area
 * @throws {Error} Toute erreur remontée par `execGit` en cas d'échec de la commande Git
 *
 * @example
 * commitChanges(cli, "/home/user/my-repo", "feat: add login page");
 */
function commitChanges(cli, gitRoot, message) {
  // Récupère la liste des fichiers actuellement indexés (staged)
  const hasChanges = execGit(cli, "git diff --cached --name-only", {
    cwd: gitRoot,
  });

  // Interrompt le processus si le staging area est vide
  if (!hasChanges.trim()) {
    cli.pushError("Nothing to commit", true);
    throw new Error("Nothing to commit");
  }

  // Lance le commit avec le message fourni, en héritant du stdio pour afficher la sortie Git
  execGit(cli, `git commit -m ${JSON.stringify(message)}`, {
    cwd: gitRoot,
    stdio: "inherit",
  });

  cli.log("✅ Commit created");
}

module.exports = commitChanges;