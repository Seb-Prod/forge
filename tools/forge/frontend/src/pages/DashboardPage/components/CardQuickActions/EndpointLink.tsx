// components/EndpointLink/EndpointLink.tsx
import { Image } from "@workspace/ui";
import styles from "./EndpointLink.module.css";

import phpMyAdminImg from "@/assets/logos/PhpMyAdmin.png";
import appImg from "@/assets/logos/react.png";
import apiImg from "@/assets/logos/api.png";

const PROCESS_CONFIG: Record<string, { image: string; label: string }> = {
  frontend: { image: appImg, label: "Frontend app" },
  backend:  { image: apiImg,  label: "Backend API"  },
  docker:   { image: phpMyAdminImg, label: "phpMyAdmin" },
};

type Process = {
  id: string;
  status: string;
  endpoint?: { url: string };
};

type EndpointLinkProps = {
  process?: Process;
  prefix: keyof typeof PROCESS_CONFIG;
};

export const EndpointLink = ({ process, prefix }: EndpointLinkProps) => {
  const config = PROCESS_CONFIG[prefix];

  if (!process?.endpoint?.url || !config) return null;

  const isRunning = process.status === "running";

  return (
    <a
      href={isRunning ? process.endpoint.url : undefined}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => { if (!isRunning) e.preventDefault(); }}
      className={!isRunning ? styles.disabledLink : ""}
    >
      <Image
        src={config.image}
        alt={config.label}
        width={48}
        height={48}
      />
    </a>
  );
};