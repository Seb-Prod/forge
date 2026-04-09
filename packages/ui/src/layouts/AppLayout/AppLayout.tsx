import { Outlet, useLocation } from "react-router-dom";
import { useIsPortrait, useIsPwaMobile } from "../../contexts";
import styles from "./AppLayout.module.css";
import { Navbar } from "../../components";
import {  ReactNode, useEffect, useState } from "react";
import { AppRoute } from "@workspace/ui/router";

/**
 * Propriétés du composant AppLayout.
 */
export interface AppLayoutProps {
  /** Liste des routes de l'application */
  routes: AppRoute[];

  /** Chemin vers le logo de l'application */
  logoSrc: string;

  /** Element à ajouter dans la navbar */
  children?: ReactNode;

  /** Surface */
  theme?: "forge" | "app";
}

/**
 * Composant de mise en page principal de l'application.
 *
 * Affiche la navigation en haut en mode desktop et en bas en mode PWA.
 * Utilise React Router pour le rendu des routes imbriquées via <Outlet />.
 */
export function AppLayout({ routes, logoSrc, children, theme="forge" }: AppLayoutProps) {

  // Applique le thème sur body pour que les portals (modals, tooltips...)
  // héritent des variables CSS
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    return () => document.body.removeAttribute("data-theme");
  }, [theme]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isPwaMobile = useIsPwaMobile();

  const location = useLocation();

  const currentRoute = routes
  .filter((r) => location.pathname.startsWith(r.to))
  .sort((a, b) => b.to.length - a.to.length)[0];

  const showNavbar = !currentRoute?.hideNavbar;
  const sidebar = currentRoute?.sidebar;

  const isPortrait = useIsPortrait();

  // if(!isPwaMobile && !isPortrait){
  //   return (
  //     <span>Error</span>
  //   )
  // }

  return (
    <div className={styles.page} data-theme={theme}>
      {showNavbar && !isPwaMobile && (
        <header className={styles.header}>
          <Navbar routes={routes} logoSrc={logoSrc}>
            {children}
          </Navbar>
        </header>
      )}

      <div className={styles.layout}>
        {sidebar && (
          <aside className={`${styles.aside} ${sidebarOpen ? styles.open : styles.closed}`}>
            {sidebar}
          </aside>
        )}

        <main className={styles.content}>
          {sidebar && (
            <button 
              className={styles.toggle}
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              {sidebarOpen ? "←" : "→"}
            </button>
          )}
          <Outlet />
        </main>
      </div>

      {isPwaMobile && (
        <footer className={styles.footer}>
          <Navbar routes={routes} logoSrc={logoSrc} />
        </footer>
      )}
    </div>
  );
}
