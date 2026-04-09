import { Badge, Card, GridLayout, Text } from "@workspace/ui";
import styles from "./CardServices.module.css";
import { servicesConfig, type ServiceName } from "./servicesConfig";
import { ServiceCard } from "./ServiceCard";

import { useDevProcesses } from "@/contexts/dev-processes";
export const CardServices = () => {
  const { processes } = useDevProcesses();

  const runningCount = processes.filter(
    (a) => a.status === "running" && a.category === "dev",
  ).length;
  const devActions = processes.filter((a) => a.category === "dev");

  return (
    <Card tone="neutral">
      <Card.Header>
        <div className={styles.header}>
          <Text as="h3">Services</Text>
        </div>
      </Card.Header>

      <Card.Content>
        {devActions.length ===0 && <span>Pas de connection</span>}
        <GridLayout columns={3} minItemWidth="100px" divider>
          {devActions.map((action) => (
            <ServiceCard
              key={action.name}
              name={action.name}
              status={action.status}
              config={servicesConfig[action.name as ServiceName]}
            />
          ))}
        </GridLayout>
      </Card.Content>
      <Card.Footer>
        <div className={styles.badgeContainer}>
          <Badge variant="pill" size="lg" appearance="filled" tone="danger">
            {runningCount}
          </Badge>
          <Text as="caption">
            {runningCount > 1 ? "Services en cours" : "Service en cours"}
          </Text>
        </div>
      </Card.Footer>
    </Card>
  );
};
