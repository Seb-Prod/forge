/**
 * Forme du contexte partagé entre les sous-composants de la Modal.
 */
export interface ModalContextType {
  /** Indique si la modal est actuellement ouverte. */
  open: boolean;
  /** Callback pour modifier l'état d'ouverture de la modal. */
  onOpenChange: (open: boolean) => void;
  /** Bloque la fermeture de la modal quand click extérieur */
  closeOnOutsideClick: boolean;
}