interface ModalDescriptionProps {
  /** Texte descriptif affiché sous le titre. */
  children: React.ReactNode;
}

/**
 * Description secondaire de la modal. Affichée sous `ModalTitle`,
 * avec une taille réduite et une opacité atténuée pour hiérarchiser l'information.
 *
 * @example
 * <ModalDescription>
 *   Votre compte sera définitivement supprimé sous 30 jours.
 * </ModalDescription>
 */
export const ModalDescription = ({ children }: ModalDescriptionProps) => {
  return (
    <div>
      {children}
    </div>
  );
};