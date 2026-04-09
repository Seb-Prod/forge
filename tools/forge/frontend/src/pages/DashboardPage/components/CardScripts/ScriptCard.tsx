import { Badge, Text } from "@workspace/ui";
import styles from "./ScriptCard.module.css";

interface ScriptCardProps {
  name: string;
  count: number;
  runningCount: number;
  runningScripts: Array<{ name: string; status: string }>;
  icon: React.ReactNode;
}

export const ScriptCard = ({
  name,
  count,
  runningCount,
  runningScripts,
  icon,
}: ScriptCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <Text as="h3" >{name}</Text>
      <Badge
        variant="pill"
        appearance="filled"
        tone={runningCount > 0 ? "success" : "neutral"}
      >
        {runningCount}/{count}
      </Badge>
        <div className={styles.runningList}>
          {runningScripts.map((script) => (
            <Text
              key={script.name}
              as="caption"
              truncate
              className={styles.scriptName}
            >
              • {script.name}
            </Text>
          ))}
        </div>  
    </div>
  );
};
