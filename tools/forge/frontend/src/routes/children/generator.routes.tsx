import type { AppRoute } from "@workspace/ui";
import { ComponentGeneratorPage, HomeGeneratorPage, HookGeneratorPage } from "@/pages";


export const generatorRoutes: AppRoute[] = [
  { index: true, element: <HomeGeneratorPage /> },
  { to: "component", label: "Ajouter un Component", element: <ComponentGeneratorPage /> },
  { to: "hook", label: "Ajouter un Hook", element: <HookGeneratorPage /> },
];