import { Badge, Box, Button, ConfirmDialog, Title, Text } from "@workspace/ui";
import { CommitCard } from "./components/CommitCard";

import { runAction } from "@/services/api";
import { SquashCommitsForm } from "./components/SquashCommitsForm";
import { useGitModal, useGitRepository } from "../../context";



type Form = {
  branch: string;
  messages: string[];
  result: boolean;
};

export const MergePreparation = () => {
  const { currentBranchCommits, currentBranch } = useGitRepository();

  const {

  activeModal,
  openModal,
  closeModal,
  result,
  setResult,
  isLoading,
  setIsLoading,
} = useGitModal();

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
        currentBranch,
      ]);

      setResult(res);
      console.log(res);
    } catch {
      setResult({
        branch: currentBranch,
        result: false,
        messages: ["Une erreur inattendue est survenue."],
      });
    } finally {
      setIsLoading(false);
      openModal("result");
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
          loading={isLoading}
          loadingText="Squash en cours"
          tone="primary"
          appearance="outline"
          onClick={() => openModal("form")}
        >
          Créer un commit unique
        </Button>
        <Button tone="secondary">Merge</Button>
      </Box>

      {/* Dialog */}
      <SquashCommitsForm
        open={activeModal === "form"}
        onOpenChange={(open) => openModal(open ? "form" : null)}
        onSubmit={handleSquash}
        isLoading={false}
      />
      <ConfirmDialog
        open={activeModal === "result"}
        onOpenChange={(open) => openModal(open ? "result" : null)}
        title={result?.result ? "Succès" : "Erreur"}
        description={
          result && (
            <Box radius={"md"} padding={"none"} gap="md" surface="none">
              <Badge>{result.branch}</Badge>
              <Box
                overflow="y"
                maxHeight="250px"
                surface="inverted"
                radius={"md"}
              >
                {result.messages?.length ? (
                  result.messages.map((msg, index) => (
                    <Text key={index}>{msg}</Text>
                  ))
                ) : result.result ? (
                  <Text>Squash effectué avec succès</Text>
                ) : (
                  <Text>Une erreur est survenue</Text>
                )}
              </Box>
            </Box>
          )
        }
        confirmLabel="OK"
        tone={result?.result ? "success" : "danger"}
        onConfirm={() => closeModal}
        hideCancel
      />
    </Box>
  );
};
