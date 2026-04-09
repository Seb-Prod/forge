import { Card, Text, Button, StatusBadge, Image } from "@workspace/ui";
import { FaMicrochip } from "react-icons/fa";
import { MdOutlineLink } from "react-icons/md";
import { VscTerminal } from "react-icons/vsc";
import styles from "./CardService.module.css";
import type { DevProcess } from "@/types/types";
import { FaPlayCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";

/**
 * Props du composant CardService.
 * Représente une carte affichant l'état et les actions d'un service.
 */
interface CardServiceProps {
  devProcess: DevProcess;
  onStart: () => void;
  onStop: () => void;
  loading: boolean;
  image?: string;
}

/**
 * Structure des informations affichées dans la carte.
 */
type InfoItem = {
  icon: React.ReactNode;
  value?: string | number;
  isLink?: boolean;
};

export const CardService = ({
  devProcess,
  onStart,
  onStop,
  loading,
  image,
}: CardServiceProps) => {
  /** Liste des informations affichées dans la carte. Permet de garder un rendu simple et maintenable. */
  const informations: InfoItem[] = [
    {
      icon: <VscTerminal />,
      value: devProcess.script,
    },
    {
      icon: <FaMicrochip />,
      value: devProcess.pid ?? "--",
    },
    {
      icon: <MdOutlineLink />,
      value: devProcess.endpoint?.url,
      isLink: true,
    },
  ];

  /** Détermine si le service est en cours d'exécution. */
  const isRunning = devProcess.status === "running";

  return (
    <Card tone="secondary">
      <Card.Header>
        <div className={styles.header}>
          {/* Illustration du service */}
          {image && <Image src={image} alt="Illustration du service" />}

          <Text as="h3" align="center">{devProcess.name}</Text>
        </div>
      </Card.Header>

      <Card.Content>
        {/* Informations du service */}
        <Text>{devProcess.description}</Text>
        {informations.map((information, i) => (
          <div key={`${devProcess.name}-${i}`} className={styles.value}>
            {information.icon}

            {information.isLink && typeof information.value === "string" ? (
              <a
                href={information.value}
                target="_blank"
                rel="noopener noreferrer"
              >
                {information.value}
              </a>
            ) : (
              <Text>{information.value ?? "—"}</Text>
            )}
          </div>
        ))}
      </Card.Content>

      <Card.Footer>
        <div className={styles.footer}>
          {/* Action principale (Start / Stop) */}
          <Button
            appearance="ghost"
            tone={isRunning ? "danger" : "success"}
            onClick={isRunning ? onStop : onStart}
            disabled={loading}
            loading={loading}
          >
            {isRunning ? <FaStopCircle /> : <FaPlayCircle />}
          </Button>
          {/* Statut du service */}
          <StatusBadge
            variant={
              devProcess.status === "running"
                ? "success"
                : devProcess.status === "stopped"
                  ? "danger"
                  : "warning"
            }
          >
            {devProcess.status}
          </StatusBadge>
        </div>
      </Card.Footer>
    </Card>
  );
};
