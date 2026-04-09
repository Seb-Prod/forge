import { QuitButton } from "./QuitButton";
import { ServiceStatus } from "./ServiceStatus";

export const AppHeader = () => {
  return (
    <>
      <ServiceStatus />
      <QuitButton />
    </>
  );
};
