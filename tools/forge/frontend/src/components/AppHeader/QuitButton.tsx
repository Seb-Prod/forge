import { useForgeHealth } from "@/hooks/useForgeHealth";
import { Button } from "@workspace/ui";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";

export const QuitButton = () => {
  const { isOnline } = useForgeHealth();
  const [loading, setLoading] = useState(false);

  const handleQuit = async () => {
    setLoading(false)
  };

  return (
    <Button
      tone="danger"
      appearance="outline"
      disabled={!isOnline || loading}
      onClick={handleQuit}
      endIcon={<FaPowerOff />}
    >
      {loading ? "Arrêt en cours..." : "Quit"}
    </Button>
  );
};
