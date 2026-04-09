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
    <p style={{ marginTop: 8, marginBottom: 0, fontSize: 14, opacity: 0.7 }}>
      {children}
    </p>
  );
};