import { StatusBadge, Text, Image } from "@workspace/ui";
import styles from "./CardServices.module.css";

interface ServiceCardProps {
  name: string;
  status: string;
  loading?: boolean;
  config?: { image: string; stack: { name: string; image: string }[] };
}

export const ServiceCard = ({
  name,
  status,
  loading,
  config,
}: ServiceCardProps) => (
  <div className={styles.serviceInfo}>
    {config?.image && <Image src={config.image} alt={name} width={60} height={60} />}
    <Text variant="body-lg" tone="default">{name}</Text>

    {config?.stack && (
      <div className={styles.stack}>
        {config.stack.map((tech) => (
          <Image key={tech.name} src={tech.image} alt={tech.name} width={30} />
        ))}
      </div>
    )}

    <StatusBadge
      variant={status === "running" ? "success" : "danger"}
      isLoading={loading}
      label={status === "running"
            ? "Online"
            : "Offline"
      }
    />
    
  </div>
);
