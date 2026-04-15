#!/usr/bin/env node

/**
 * @file git-remote-branches.js
 * Script CLI pour lister les branches Git locales et distantes (avec fetch)
 */

const { createCLIContext } = require("../utils/cli");
const { clearConsole } = require("../utils/console");
const { printLogo } = require("../utils/logo");
const { createGitUtils } = require("./utils");

// Initialisation du contexte CLI (args, logs, gestion erreurs)
const cli = createCLIContext(process.argv);

// Initialisation des utilitaires Git liés au CLI
const git = createGitUtils(cli);

// Nettoyage console + affichage du logo (optionnel selon flags)
clearConsole(cli.args);
printLogo(cli.log, cli.silent);

// Résolution du répertoire courant (géré par le CLI)
const cwd = cli.resolveCwd();

// Détection de la racine du dépôt Git
const gitRoot = git.resolveGitRoot(cwd);

// Stop si pas dans un dépôt Git
if (!gitRoot) cli.exitWithResult({});

// Synchronisation des refs distantes (non bloquant si offline)
git.fetchRemote(gitRoot);

// Liste des branches locales et distantes
const localBranches  = git.getLocalBranches(gitRoot);
const remoteBranches = git.getRemoteBranches(gitRoot);

const localSet  = new Set(localBranches);
const remoteSet = new Set(remoteBranches.map((b) => b.replace("origin/", "")));

// Construction de la liste enrichie (local + remote)
const allNames = new Set([...localSet, ...remoteSet]);

const branches = Array.from(allNames).map((name) => ({
  name,
  local:  localSet.has(name),
  remote: remoteSet.has(name),
}));

cli.log(`🌐 ${remoteSet.size} branches remote détectées`);
cli.log(`🌿 ${localSet.size} branches locales`);

// Sortie finale standardisée (toujours appelée)
cli.exitWithResult({ branches });