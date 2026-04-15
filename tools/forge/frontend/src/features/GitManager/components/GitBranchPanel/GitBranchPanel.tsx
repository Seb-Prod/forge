import { useRef, useState } from "react";
import styles from "./GitBranchPanel.module.css";
import { BranchPaths, BranchTree } from "./components";
import { Button, ConfirmDialog, Text } from "@workspace/ui";
import { LuGitBranchPlus } from "react-icons/lu";
import { useGit } from "../../context/useGit";
import { runAction } from "@/services/api";
import { CreateBranchDialog } from "./components/Createbranchdialog";

type Checkout = {
  messages: string[];
  result: boolean;
};

type ActiveModal = "create" | "result" | null;

/**
 * GitBranchPanel
 *
 * Affiche un arbre de branches avec les chemins de connexion entre elles.
 *
 * - Mise en évidence la branche active.
 * - Affichage si la branche est en local et distante.
 * - Possibilité de supprimer une branche.
 * - Changement de branche.
 * - Création d'une nouvelle branche depuis la branche active.
 */
export const GitBranchPanel = () => {
  const { mergedBranches, currentBranch } = useGit();

  const containerRef = useRef<HTMLDivElement>(null);
  const { hasModifications } = useGit();

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [result, setResult] = useState<Checkout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewBranch = async (branchName: string) => {
    setIsLoading(true);

    try {
      const res = await runAction<Checkout>("git-create-branch", [
        "--branch",
        branchName,
        "--clear",
      ]);
      setResult(res);
    } catch {
      setResult({
        result: false,
        messages: ["Une erreur inattendue est survenue."],
      });
    } finally {
      setIsLoading(false);
      setActiveModal("result");
    }
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
      <div>
        <Button
          className={styles.button}
          size="sm"
          appearance="ghost"
          startIcon={<LuGitBranchPlus />}
          // disabled={hasModifications}
          onClick={() => setActiveModal("create")}
        >
          Créer une branche
        </Button>
        <BranchPaths branches={mergedBranches} containerRef={containerRef} />
        <BranchTree branches={mergedBranches} currentBranch={currentBranch} />
        {hasModifications && (
          <Text tone="warning" size="xs">
            ⚠️ Impossible de créer ou de changer de branche tant que des
            modifications locales sont présentes.
          </Text>
        )}
      </div>

      <CreateBranchDialog
        open={activeModal === "create"}
        onOpenChange={(open) => setActiveModal(open ? "create" : null)}
        onSubmit={handleNewBranch}
        isLoading={isLoading}
      />

      <ConfirmDialog
        open={activeModal === "result"}
        onOpenChange={(open) => setActiveModal(open ? "result" : null)}
        title={result?.result ? "Succès" : "Erreur"}
        description={
          result?.messages?.length
            ? result.messages.join("\n")
            : result?.result
              ? "Branche créée avec succès"
              : "Une erreur est survenue"
        }
        confirmLabel="OK"
        tone={result?.result ? "success" : "danger"}
        onConfirm={() => setActiveModal(null)}
        hideCancel
      />
    </div>
  );
};
