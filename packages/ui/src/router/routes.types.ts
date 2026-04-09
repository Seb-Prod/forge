import { ReactNode } from "react";

/**
 * Configuration d'une route de l'application.
 * Utilisé pour :
 * - La navigation (Navbar / PWA)
 * - Le routing React Router
 * - Les layouts dynamiques (sidebar, navbar, etc.)
 */
export type AppRoute = {
  /** Chemin de la route */
  to: string;

  /** Label affiché dans la navigation */
  label?: string;

  index?: boolean;

  /** Icône affichée dans la navigation */
  icon?: ReactNode;

  /** Visible dans la navbar web */
  showInWeb?: boolean;

  /** Visible dans la navbar PWA */
  showInPWA?: boolean;

  /** Composant rendu par la route */
  element?: ReactNode;

  /** Indique si la page est une démo */
  isDemo?: boolean;

  /** Sidebar spécifique à la page */
  sidebar?: ReactNode;

  /** Masque la navbar pour cette page */
  hideNavbar?: boolean;

  /** Routes enfants (pour l'Outlet) */
  children?: AppRoute[];
};