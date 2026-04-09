import {
  DevProcessesProvider,
  useDevProcesses,
} from "@/contexts/dev-processes";
import { GridLayout, PageLayout, Text } from "@workspace/ui";
import { CardService } from "./components/CardService/CardService";
import { useMemo, useState } from "react";
import { startAction, stopAction } from "@/services/api";
import { waitForProcess } from "@/services/waitForProcess";
import { SERVICES } from "@/config/services";


const ServicesContent = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  /** Gestion du loading par service */
  const { processes } = useDevProcesses();

  /** Transforme la liste des processes en map pour un accès rapide par id. */
  const processesMap = useMemo(
    () => Object.fromEntries(processes.map((p) => [p.id, p])),
    [processes],
  );

  /** Démarrage ou arrêt d'un service */
  const handleAction = async (actionId: string, action: "start" | "stop") => {
    setLoading((prev) => ({ ...prev, [actionId]: true }));

    try {
      if (action === "start") {
        await startAction(actionId);
        await waitForProcess(actionId, "running");
      } else {
        await stopAction(actionId);
        await waitForProcess(actionId, "stopped");
      }
    } catch (error) {
      console.error(`Failed to ${action} ${actionId}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [actionId]: false }));
    }
  };

  return (
    <PageLayout surface="base">
      <Text align="center">Services</Text>
      <GridLayout minItemWidth="200px">
        {SERVICES.map((service) => {
          const devProcess = processesMap[service.id];

          /** Si le process n'existe pas encore on n'affiche pas la carte. */
          if (!devProcess) return null;

          return (
            <CardService
              key={service.id}
              devProcess={devProcess}
              image={service.image}
              onStart={() => handleAction(service.id, "start")}
              onStop={() => handleAction(service.id, "stop")}
              loading={loading[service.id]}
            />
          );
        })}
      </GridLayout>
    </PageLayout>
  );
};

/**
 * Page principale des services
 * avec provider des processus de développement.
 */
export const ServicesPage = () => {
  return (
    <DevProcessesProvider>
      <ServicesContent />
    </DevProcessesProvider>
  );
};
