import { GridLayout, PageLayout,Text } from "@workspace/ui";
import { CardQuickActions, CardScripts, CardServices } from "./components";
import { DevProcessesProvider } from "@/contexts/dev-processes";

export const DashboardPage = () => {
  return (
      <DevProcessesProvider>
        <PageLayout>
          <Text align="center">Forge Dashboard</Text>
          <CardQuickActions />
          <GridLayout minItemWidth="300px">
            <CardServices />
            <CardScripts />
          </GridLayout>
        </PageLayout>
      </DevProcessesProvider>

  );
};
