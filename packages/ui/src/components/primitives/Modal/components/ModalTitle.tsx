import { Text } from "@workspace/ui";

interface ModalTitleProps {
  /** Texte ou éléments React constituant le titre. */
  children: React.ReactNode;
}

/**
 * Titre principal de la modal. Utilise le composant `Text` du design system
 * avec le niveau sémantique `h2` et la taille `2xl`.
 *
 * @example
 * <ModalTitle>Confirmer la suppression</ModalTitle>
 */
export const ModalTitle = ({ children }: ModalTitleProps) => {
  return <Text as="h2" size="2xl">{children}</Text>;
};