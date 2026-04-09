import { useDevProcesses } from "@/contexts/dev-processes";
import { useActionLoader } from "@/hooks/useActionLoader";
import { startAction } from "@/services/api";
import { Button, Image, Card, GridLayout, Text } from "@workspace/ui";
import styles from "./CardQuickActions.module.css";
import { waitForProcess } from "@/services/waitForProcess";
import vsCodeImg from "@/assets/logos/VSCode.png";
import { useMemo, useState } from "react";
import { EndpointLink } from "./EndpointLink";
import { SERVICES, VSCODE_SERVICE } from "@/config/services";


export const CardQuickActions = () => {
  const { processes } = useDevProcesses();
  const { handleExecute } = useActionLoader(startAction);

  const [starting, setStarting] = useState(false);

  /**
   * Transforme la liste des processes en map pour un accès rapide
   */
  const processesMap = useMemo(
    () => Object.fromEntries(processes.map((p) => [p.id, p])),
    [processes],
  );

  /**
   * Récupération des services principaux
   */
  const vscode = processesMap[VSCODE_SERVICE.id];

  /**
   * Vérifie si tous les services sont déjà démarrés
   */
  const allRunning = SERVICES.every(
    (service) => processesMap[service.id]?.status === "running",
  );

  /**
   * Démarre tous les services dans l'ordre défini
   */
  const handleStartAll = async () => {
    if (starting) return;

    setStarting(true);

    try {
      for (const service of SERVICES) {
        const process = processesMap[service.id];
        if (!process) continue;

        await handleExecute(process.id);
        await waitForProcess(process.id, "running");
      }
    } finally {
      setStarting(false);
    }
  };

  return (
    <Card tone="neutral">
      <Card.Header>
        <div className={styles.header}>
          <Text as="h3">Quick Actions</Text>
        </div>
      </Card.Header>

      <Card.Content>
        <div className={styles.content}>
          {/* Bouton ouverture VS Code */}
          <Button
            appearance="outline"
            tone="neutral"
            onClick={() => vscode && handleExecute(vscode.id)}
            disabled={!vscode}
          >
            <div className={styles.button}>
              <Image src={vsCodeImg} alt="Logo VS Code" width={30} />
              <Text>Ouvrir VS Code</Text>
            </div>
          </Button>

          {/* Démarrage global des services */}
          <Button
            appearance="outline"
            tone="secondary"
            loading={starting}
            loadingText="Services en cours de démarrage"
            onClick={handleStartAll}
            disabled={SERVICES.some((s) => !processesMap[s.id]) || allRunning}
          >
            Démarrer tous les services
          </Button>
        </div>
      </Card.Content>

      <Card.Footer>
        <div className={styles.footer}>
          <Text>
            {allRunning
              ? "Cliquez sur une icône pour ouvrir le service dans un nouvel onglet."
              : "Démarrez les services pour y accéder."}
          </Text>
          <GridLayout columns={3}>
            {SERVICES.map((service) => (
              <EndpointLink
                key={service.id}
                process={processesMap[service.id]}
                prefix={service.prefix}
              />
            ))}
          </GridLayout>
        </div>
      </Card.Footer>
    </Card>
  );
};
