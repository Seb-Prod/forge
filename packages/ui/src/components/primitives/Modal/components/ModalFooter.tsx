interface ModalFooterProps {
  /** Actions de la modal, typiquement des boutons de confirmation et d'annulation. */
  children: React.ReactNode;
}

/**
 * Pied de page de la modal. Aligne les actions à droite avec un espacement
 * uniforme entre elles.
 *
 * @example
 * <ModalFooter>
 *   <ModalClose><button>Annuler</button></ModalClose>
 *   <button onClick={handleConfirm}>Confirmer</button>
 * </ModalFooter>
 */
export const ModalFooter = ({ children }: ModalFooterProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
      {children}
    </div>
  );
};