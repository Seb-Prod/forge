import { Badge, Box, Button, Title } from "@workspace/ui";
import { useGit } from "../../context/useGit";
import { CommitCard } from "./components/CommitCard";
import { useState } from "react";
import { runAction } from "@/services/api";
import { SquashCommitsForm } from "./components/SquashCommitsForm";

type ActiveModal = "form" | "result" | null;

type Form = {
  messages: string[];
  result: boolean;
};

export const MergePreparation = () => {
  const { currentBranchCommits, currentBranch } = useGit();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [result, setResult] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const wipCommits = currentBranchCommits.filter((c) =>
    c.message.toLowerCase().includes("wip"),
  );

  const cleanedCount = currentBranchCommits.length - wipCommits.length;

  const handleSquash = async (commitDescription: string) => {
    setIsLoading(true);

    try {
      const res = await runAction<Form>("git-squash-branch", [
        "--message",
        commitDescription,
        "--branch",
        currentBranch
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
    <Box gap="md">
      {/* Header */}
      <Title as="h2">Préparation du merge</Title>

      {/* Stats */}
      <Box flexDirection="row" gap="md" margin="none" padding="none">
        <Badge tone="info">
          {currentBranchCommits.length} commits détectés
        </Badge>

        {wipCommits.length > 0 && (
          <Badge tone="warning">{wipCommits.length} WIP détectés</Badge>
        )}

        <Badge tone="success">{cleanedCount} commits prêts</Badge>
      </Box>

      {/* Commit list */}
      <Box
        overflow="y"
        maxHeight="300px"
        radius="md"
        gap="md"
        margin="none"
        padding="none"
      >
        {currentBranchCommits.map((commit) => (
          <CommitCard
            key={commit.id}
            message={commit.message}
            hash={commit.id}
          />
        ))}
      </Box>

      {/* Actions */}
      <Box flexDirection="row" gap="md" margin="none" padding="none">
        <Button
          tone="primary"
          appearance="outline"
          onClick={() => setActiveModal("form")}
        >
          Créer un commit unique
        </Button>
        <Button tone="secondary">Merge</Button>
      </Box>

      {/* Dialog */}
      <SquashCommitsForm
        open={activeModal === "form"}
        onOpenChange={(open) => setActiveModal(open ? "form" : null)}
        onSubmit={handleSquash}
        isLoading={false}
      />
    </Box>
  );
};
