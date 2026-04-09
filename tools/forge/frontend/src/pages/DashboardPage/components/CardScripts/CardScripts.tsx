import { Card, GridLayout, Text, Badge } from "@workspace/ui";
import styles from "./CardScripts.module.css";
import { ScriptCard } from "./ScriptCard";

import { HiServer } from "react-icons/hi2";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { HiCommandLine } from "react-icons/hi2";
import { FaGitAlt } from "react-icons/fa";
import { useDevProcesses } from "@/contexts/dev-processes";

export const CardScripts = () => {
  const { processes } = useDevProcesses();

  const runningCount = processes.filter((a) => a.status === "running").length;

  const getCategoryStats = (category: string) => {
    const filtered = processes.filter((a) => a.category === category);
    const running = filtered.filter((a) => a.status === "running");
    return {
      count: filtered.length,
      runningCount: running.length,
      runningScripts: running,
    };
  };

  const scriptCategories = [
    { name: "Services", icon: <HiServer size={42} />, category: "dev" },
    {
      name: "Tools",
      icon: <HiWrenchScrewdriver size={42} />,
      category: "tools",
    },
    {
      name: "Generator",
      icon: <HiCommandLine size={42} />,
      category: "generator",
    },
    { name: "Git", icon: <FaGitAlt size={42} />, category: "git" },
  ];

  return (
    <Card tone="neutral">
      <Card.Header>
        <div className={styles.header}>
          <Text as="h3">Scripts</Text>
        </div>
      </Card.Header>
      <Card.Content>
        <GridLayout columns={4} minItemWidth="100px" divider="vertical" >
          {scriptCategories.map(({ name, category, icon }) => {
            const stats = getCategoryStats(category);
            return <ScriptCard key={name} name={name} icon={icon} {...stats} />;
          })}
        </GridLayout>
      </Card.Content>
      <Card.Footer>
        <div className={styles.badgeContainer}>
          <Badge variant="pill" size="lg" appearance="filled" tone="danger">
            {runningCount}
          </Badge>
          <Text as="caption">
            {runningCount > 1 ? "Scripts en cours" : "Script en cours"}
          </Text>
        </div>
      </Card.Footer>
    </Card>
  );
};
