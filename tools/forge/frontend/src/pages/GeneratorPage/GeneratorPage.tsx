import { PageLayout } from "@workspace/ui";
import { Outlet } from "react-router-dom";

/**
 * Page layout principale du module Generator.
 *
 * Cette page sert de conteneur pour toutes les sous-pages du générateur.
 */
export const GeneratorPage = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};