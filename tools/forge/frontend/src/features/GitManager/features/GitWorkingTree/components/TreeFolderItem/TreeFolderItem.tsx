import { Box, Checkbox, IconToggle, Text } from "@workspace/ui";
import type { ReactNode } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import type { FolderNode } from "../../types";

interface TreeFolderItemProps {
  /** Nœud de type dossier à afficher. */
  node: FolderNode;
  /** État de sélection de chaque fichier, indexé par chemin. */
  checked: Record<string, boolean>;
  /**
   * Callback déclenché quand l'utilisateur coche ou décoche un élément.
   * @param path - Chemin du fichier ou du dossier concerné.
   */
  onToggleCheck: (path: string) => void;
  /** État d'ouverture du dossier, contrôlé par `TreeFolder` du package. */
  open: boolean;
  /** Callback déclenché au clic sur l'icône toggle. */
  onToggle: () => void;
  /** Enfants rendus par `TreeView` quand le dossier est ouvert. */
  children?: ReactNode;
}

/**
 * Construit la clé utilisée dans `checked` pour identifier un dossier.
 * Le slash final distingue les dossiers des fichiers dans le record.
 *
 * @example
 * folderKey("src/components") // "src/components/"
 */
const folderKey = (path: string) => `${path}/`;

/**
 * TreeFolderItem
 *
 * Nœud dossier de l'arborescence Git, dépliable et sélectionnable.
 *
 * - Affiche une icône toggle (ouvert / fermé) dont l'état est géré par `TreeFolder`.
 * - Expose une checkbox uniquement pour les dossiers `untracked` — Git ne tracke
 *   pas les dossiers modifiés ou supprimés en tant qu'entité.
 * - Délègue le rendu récursif des enfants à `TreeView` via la prop `children`.
 */
export const TreeFolderItem = ({
  node,
  checked,
  onToggleCheck,
  open,
  onToggle,
  children,
}: TreeFolderItemProps) => {
  return (
    <Box gap="xs"  surface="none">
      <Box flexDirection="row" gap="xs" surface="none">
        {node.status === "untracked" && (
          <Checkbox
            checked={!!checked[folderKey(node.path)]}
            onChange={() => onToggleCheck(folderKey(node.path))}
          />
        )}
        <IconToggle
          activeIcon={<FaFolderOpen />}
          inactiveIcon={<FaFolder />}
          pressed={open}
          onToggle={onToggle}
          ariaLabel={open ? "Fermer le dossier" : "Ouvrir le dossier"}
          size="xs"
          color="rgb(255, 193, 7)"
        />
        <Text>{node.name}</Text>
      </Box>
      {children}
    </Box>
  );
};
