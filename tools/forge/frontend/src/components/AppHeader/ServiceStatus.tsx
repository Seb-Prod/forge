import { useForgeHealth } from "@/hooks/useForgeHealth";
import { StatusBadge } from "@workspace/ui";

export const ServiceStatus = () => {
  const { isOnline, loading } = useForgeHealth();

  return (
    <StatusBadge
      variant={isOnline ? "success" : "danger"}
      isLoading={loading}
      label={loading ? "vérification..." : isOnline ? "Online" : "Offline"}
    />
  );
};
