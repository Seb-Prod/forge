import {
  GitManager,
  GitModalProvider,
  GitRepositoryProvider,
} from "@/features/GitManager";
import { PageLayout } from "@workspace/ui";

export const GitPage = () => {
  return (
    <PageLayout>
      <GitRepositoryProvider>
        <GitModalProvider>
          <GitManager />
        </GitModalProvider>
      </GitRepositoryProvider>
    </PageLayout>
  );
};
