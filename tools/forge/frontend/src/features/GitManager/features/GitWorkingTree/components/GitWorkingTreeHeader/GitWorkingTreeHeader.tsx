import { useGitRepository } from "@/features/GitManager/context";
import { AutoRefreshIndicator, BoxRow, NewButton, Text } from "@workspace/ui";
import { useNow } from "./useNow";

export const GitWorkingTreeHeader = () => {
  const { lastLocalRun, handleLocalTree } = useGitRepository();

  const now = useNow();

  const remaining =
    lastLocalRun == null ? null : Math.max(0, lastLocalRun + 30000 - now);

  return (
    <BoxRow
      alignItems="center"
      justifyContent="between"
    >
      <Text size="xl">Sélectionner les fichiers :</Text>

      <BoxRow gap="sm" width={"auto"}>
        <AutoRefreshIndicator ms={remaining} />

        <NewButton
          onClick={handleLocalTree}
        >
          Rafraîchir
        </NewButton>
      </BoxRow>
    </BoxRow>
  );
};
