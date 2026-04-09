// ─── ModalHeader.tsx ─────────────────────────────────────────────────────────

interface ModalHeaderProps {
  /** Contenu de l'en-tête, typiquement `ModalTitle` et `ModalDescription`. */
  children: React.ReactNode;
}

/**
 * En-tête de la modal. Ajoute un espacement inférieur pour séparer
 * visuellement le titre du corps de la modal.
 *
 * @example
 * <ModalHeader>
 *   <ModalTitle>Supprimer le compte</ModalTitle>
 *   <ModalDescription>Cette action est irréversible.</ModalDescription>
 * </ModalHeader>
 */
export const ModalHeader = ({ children }: ModalHeaderProps) => {
  return <div style={{ marginBottom: 16 }}>{children}</div>;
};