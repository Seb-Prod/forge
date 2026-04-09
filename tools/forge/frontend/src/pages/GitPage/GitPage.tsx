import { GitManager } from "@/features/GitManager";
import { GitProvider } from "@/features/GitManager/context/GitProvider";
import { PageLayout } from "@workspace/ui";

export const GitPage = () => {
  return (
    <PageLayout>
      <GitProvider>
        <GitManager />
      </GitProvider>
    </PageLayout>
  );
};
