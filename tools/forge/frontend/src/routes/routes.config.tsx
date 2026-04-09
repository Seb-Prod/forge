import type { AppRoute } from "node_modules/@workspace/ui/src/router";
import { FaHome } from "react-icons/fa";
import { HiServer } from "react-icons/hi";
import { TiThMenu } from "react-icons/ti";
import {
  DashboardPage,
  GeneratorPage,
  GitPage,
  ServicesPage,
  ShowcasePage,
  ToolsPage,
} from "@/pages";
import { Sidebar } from "@workspace/ui/components/composites";
import { generatorRoutes, showcaseRoutes } from "./children";

export const APP_ROUTES: AppRoute[] = [
  {
    to: "/",
    label: "Dashboard",
    showInWeb: true,
    showInPWA: true,
    element: <DashboardPage />,
    icon: <FaHome />,
  },
  {
    to: "/services",
    label: "Services",
    showInWeb: true,
    showInPWA: true,
    element: <ServicesPage />,
    icon: <HiServer />,
  },
  {
    to: "/git",
    label: "Git",
    showInWeb: true,
    element: <GitPage />,
    showInPWA: true,
  },
  {
    to: "/generator",
    label: "Generator",
    element: <GeneratorPage />,
    showInWeb: true,
    showInPWA: true,
    sidebar: <Sidebar routes={generatorRoutes} basePath="/generator" />,
    children: generatorRoutes,
  },
  {
    to: "/tools",
    label: "Tolls",
    element: <ToolsPage />,
    showInWeb: true,
    showInPWA: true,
  },
  {
    to: "/showcase",
    label: "Showcase",
    showInWeb: true,
    showInPWA: true,
    element: <ShowcasePage />,
    icon: <TiThMenu />,
    sidebar: <Sidebar routes={showcaseRoutes} basePath="/showcase" />,
    children: showcaseRoutes,
  },
];
