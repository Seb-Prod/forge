import { IoChevronBackCircleSharp } from "react-icons/io5";
import { IoConstructSharp } from "react-icons/io5";
import { MdConstruction } from "react-icons/md";
import { TbFaceIdError } from "react-icons/tb";
import styles from "./UnderConstructionPage.module.css";
import { CardHold, Link } from "../../components";

/**
 * Propriétés du composant UnderConstructionPage.
 */
export interface UnderConstructionPageProps {
  /** URL de redirection personnalisée (par défaut: "/") */
  homeUrl?: string;
  /** Message personnalisé (optionnel) */
  message?: string;
  /** Titre de la page en construction (optionnel) */
  pageTitle?: string;
}

/**
 * Page affichée pour les fonctionnalités en cours de développement.
 *
 * @example
 * ```tsx
 * <Route path="/nouvelle-feature" element={<UnderConstructionPage pageTitle="Tableau de bord" />} />
 * ```
 */
export const UnderConstructionPage = ({
  homeUrl = "/",
  message = "Cette page est actuellement en développement. Revenez bientôt !",
  pageTitle = "Page",
}: UnderConstructionPageProps) => {
  return (
    <div className={styles.container}>
      <CardHold
      variant="elevated"
        tone="warning"
        title="En construction"
        size="lg"
        headerAction={
          <div className={styles.headerBadge}>
            <MdConstruction />
          </div>
        }
        footer={
          <div className={styles.footer}>
            <span className={styles.footerText}>
              Merci de votre patience pendant que nous travaillons dessus.
            </span>
          </div>
        }
      >
        <h1>{pageTitle} en construction</h1>
        <p>{message}</p>
        <Link size="sm" variant="warning" to={homeUrl}>
          <IoConstructSharp />
          Retour à l'accueil
        </Link>
      </CardHold>
    </div>
  );
};
