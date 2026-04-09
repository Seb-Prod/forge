import { IoChevronBackCircleSharp } from "react-icons/io5";
import { TbFaceIdError } from "react-icons/tb";
import styles from "./NotFoundPage.module.css";
import { CardHold, Link } from "../../components";

/**
 * Propriétés du composant NotFoundPage.
 */
export interface NotFoundPageProps {
  /** URL de redirection personnalisée (par défaut: "/") */
  homeUrl?: string;
  /** Message personnalisé (optionnel) */
  message?: string;
}

/**
 * Page d'erreur 404 affichée lorsqu'une route n'existe pas.
 * 
 * @example
 * ```tsx
 * <Route path="*" element={<NotFoundPage homeUrl="/dashboard" />} />
 * ```
 */
export const NotFoundPage = ({homeUrl="/", message="Oups… la page que vous cherchez n'existe pas ou a été déplacée."}:NotFoundPageProps) => {
  return (
    <div className={styles.container}>
      <CardHold
        tone="danger"
        variant="elevated"
        title="404"
        size="lg"
        headerAction={
          <div className={styles.headerBadge}>
            <TbFaceIdError />
          </div>
        }
        footer={
          <div className={styles.footer}>
            <span className={styles.footerText}>
              Vérifiez l’URL ou revenez à l’accueil.
            </span>
          </div>
        }
      >
        <h1>Page introuvable</h1>
        <p>{message}</p>
        <Link
          size="sm"
          variant="danger"
          to={homeUrl}
        >
          <IoChevronBackCircleSharp/>
          Retour à l'accueil
        </Link>
      </CardHold>
      
        
    </div>
  );
}
