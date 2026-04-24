import { runAction } from "@/services/api";
import { useGitModal } from "../context/";
import { type FormResult } from "../context/GitModal/GitModalContext.types";

/**
 * Actions Git disponibles pour l'exécution via `runAction`.
 */
type GitAction = "git-commit" | "git-delete-branch" | "git-create-branch";

/**
 * Hook exposant les actions Git principales (commit, suppression et création de branche).
 *
 * Interagit avec le contexte `GitModal` pour gérer le chargement,
 * les résultats et l'affichage des modales.
 *
 * @example
 * const { commit, deleteBranch, createBranch } = useGitActions();
 * await commit("feat: ajout du composant Button");
 */
export const useGitActions = () => {
  const { payload, setIsLoading, setResult, openModal } = useGitModal();

  const isDebug = import.meta.env.VITE_GIT_DEBUG === "true";

  /**
   * Stocke le résultat d'une action et ouvre la modale de résultat.
   *
   * @param res - Résultat de l'action Git.
   */
  const handleResult = (res: FormResult) => {
    setResult(res);
    openModal("result");
  };

  /**
   * Gère les erreurs inattendues en affichant un message générique dans la modale.
   *
   * @param branch - Nom de la branche concernée par l'erreur.
   */
  const handleError = (branch: string) => {
    handleResult({
      branch,
      result: false,
      messages: ["Une erreur inattendue est survenue."],
    });
  };

  /**
   * Exécute une action Git via `runAction` avec gestion du chargement et des erreurs.
   *
   * En mode debug (`VITE_GIT_DEBUG=true`), le flag `--silent` est omis.
   *
   * @param action - Identifiant de l'action Git à exécuter.
   * @param args - Arguments passés à l'action.
   * @param branch - Nom de la branche concernée (utilisé en cas d'erreur).
   */
  const executeAction = async (
    action: GitAction,
    args: string[],
    branch: string,
  ) => {
    setIsLoading(true);

    const finalArgs = isDebug ? args : [...args, "--silent"];

    try {
      const res = await runAction<FormResult>(action, finalArgs);
      handleResult(res);
    } catch {
      handleError(branch);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Effectue un commit sur la branche et les fichiers définis dans le payload.
   *
   * @param commitDescription - Message du commit.
   * @returns Une promesse résolue une fois le commit effectué, ou `undefined` si le payload est invalide.
   */
  const commit = async (commitDescription: string) => {
    if (payload?.modal !== "commit") return;

    const { modified, deleted, untracked } = payload.selectedFiles;
    const selectedPaths = [...modified, ...deleted, ...untracked];

    await executeAction(
      "git-commit",
      [
        "--branch",
        payload.branchName,
        "--message",
        commitDescription,
        "--files",
        JSON.stringify(selectedPaths),
      ],
      payload.branchName,
    );
  };

  /**
   * Supprime la branche définie dans le payload.
   *
   * @returns Une promesse résolue une fois la branche supprimée, ou `undefined` si le payload est invalide.
   */
  const deleteBranch = async () => {
    if (payload?.modal !== "delete") return;

    await executeAction(
      "git-delete-branch",
      ["--branch", payload.branchName],
      payload.branchName,
    );
  };

  /**
   * Crée une nouvelle branche Git.
   *
   * @param branchName - Nom de la branche à créer.
   * @returns Une promesse résolue une fois la branche créée, ou `undefined` si le nom est manquant.
   */
  const createBranch = async (branchName: string) => {
    if (!branchName) {
      console.warn("No branchName provided");
      return;
    }

    await executeAction(
      "git-create-branch",
      ["--branch", branchName],
      branchName,
    );
  };

  return {
    commit,
    deleteBranch,
    createBranch,
  };
};
