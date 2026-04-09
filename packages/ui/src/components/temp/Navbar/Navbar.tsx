import { ReactNode, useState } from "react";
import { AppRoute } from "../../../types";
import { PwaMode, useIsMobile, useIsPwaMobile } from "../../../contexts/device";
import { classNames } from "../../../functions/classNames";
import { Logo } from "../Logo";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import styles from "./Navbar.module.css";
import { Link } from "@workspace/ui";

/**
 * Propriétés du composant Navbar.
 */
export interface NavbarProps {
  /** Liste des routes à afficher dans la navigation */
  routes: AppRoute[];
  
  /** Chemin vers le logo de l'application */
  logoSrc: string;

  /** Element à ajouter dans la navba */
  children?: ReactNode;
}

/**
 * Composant de navigation adaptatif.
 * 
 * Affiche une barre de navigation en haut pour le web avec burger menu sur mobile,
 * et une navigation en bas pour le mode PWA mobile avec icônes.
 */
export function Navbar({ routes, logoSrc, children }: NavbarProps) {
  const isMobile = useIsMobile();
  const isPwaMobile = useIsPwaMobile();
  
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleRoutes = routes.filter((route) =>
    isPwaMobile ? route.showInPWA : route.showInWeb,
  );

  /**
   * Ferme le menu mobile.
   */
  const handleCloseMenu = () => setMenuOpen(false);

  /**
   * Toggle l'état du menu mobile.
   */
  const handleToggleMenu = () => setMenuOpen((open) => !open);

  // Version PWA Mobile (bottom navigation)
  if (isPwaMobile) {
    return (
      <nav className={styles.navbarMobile}>
        {visibleRoutes.map((route) => (
          <Link
            key={route.to}
            size="lg"
            tone="secondary"
            appearance="ghost"
            to={route.to}
            onClick={handleCloseMenu}
          >
            <div className={styles.icons}>
              {route.icon}
              {route.label}
            </div>
          </Link>
        ))}
      </nav>
    );
  }

  // Version Web (top navigation)
  return (
    <nav
      className={classNames(
        styles.navbar,
        isMobile && menuOpen && styles.menuOpen,
      )}
    >
      <Logo logoSrc={logoSrc} />

      <div className={styles.links}>
        {isMobile && menuOpen && (
          <span className={styles.menuLabel}>Navigation</span>
        )}
        
        {visibleRoutes.map((route) => (
          <Link
            key={route.to}
            size="lg"
            tone="secondary"
            appearance="ghost"
            to={route.to}
            onClick={handleCloseMenu}
          >
            {route.label}
          </Link>
        ))}
        {children}
      </div>

      {isMobile && (
        <BurgerMenu isOpen={menuOpen} onClick={handleToggleMenu} />
      )}
    </nav>
  );
}