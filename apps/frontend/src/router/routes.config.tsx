import { UnderConstructionPage } from "@workspace/ui/pages";
import type { AppRoute } from "@workspace/ui/types";
export const APP_ROUTES: AppRoute[] = [
  {
    to: "/",
    label: "Accueil",
    showInWeb: true,
    showInPWA: true,
    element: <UnderConstructionPage/>,
    icon: ""
  },
  {
    to: "/services",
    label: "Services",
    showInWeb: true,
    showInPWA: true,
    element: <UnderConstructionPage/>,
    icon: "",
  },
];
