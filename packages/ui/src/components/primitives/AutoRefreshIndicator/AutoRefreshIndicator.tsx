import { FiRefreshCcw } from "react-icons/fi";
import { Badge, Text } from "@workspace/ui";
import styles from "./AutoRefreshIndicator.module.css";

type Props = {
  ms: number | null;
};

export const AutoRefreshIndicator = ({ ms }: Props) => {
  if (ms === null) {
    return <Text size="sm">Auto-refresh désactivé</Text>;
  }

  const seconds = Math.ceil(ms / 1000);
  const isSyncing = seconds <= 1;

  return (
    <div className={styles.container}>
      <Text size="sm" >
        Prochaine mise à jour dans
      </Text>
      <Badge tone="secondary" appearance="soft" className={styles.badge}>
        {isSyncing ? <FiRefreshCcw className={styles.icon} /> : `${seconds}s`}
      </Badge>
    </div>
  );
};
