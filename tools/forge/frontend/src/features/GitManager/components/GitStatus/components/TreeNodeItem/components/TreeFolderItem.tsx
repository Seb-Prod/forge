import { useState } from "react";
import type { FolderNode } from "../../../GitStatus.types";
import { Box, Checkbox, IconToggle, Text } from "@workspace/ui";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { TreeNodeItem } from "../TreeNodeItem";

interface TreeFolderItemProps {
  /** Nœud de type dossier à afficher, contenant ses enfants récursifs. */
  node: FolderNode;
  /** État de sélection de chaque fichier, indexé par chemin. */
  checked: Record<string, boolean>;
  /**
   * Callback déclenché quand l'utilisateur coche ou décoche un élément.
   * @param path - Chemin du fichier ou du dossier concerné.
   */
  onToggleCheck: (path: string) => void;
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
 * `TreeFolderItem` — Nœud dossier de l'arborescence Git, dépliable et sélectionnable.
 *
 * Affiche un dossier avec son nom, une icône d'état (ouvert/fermé) et,
 * pour les dossiers non suivis (`untracked`), une checkbox de sélection.
 * Ses enfants sont rendus récursivement via `TreeNodeItem` lorsque le dossier est ouvert.
 *
 * ### Comportement de la checkbox
 * Seuls les dossiers `untracked` exposent une checkbox, car un dossier
 * modifié ou supprimé n'existe pas en tant qu'entité Git — seuls ses
 * fichiers enfants sont trackés individuellement.
 *
 * ### Clé de sélection
 * Les dossiers sont identifiés dans `checked` avec un slash final (`"path/"`)
 * pour les distinguer des fichiers (`"path"`). Voir `folderKey`.
 *
 * @example
 * <TreeFolderItem
 *   node={folderNode}
 *   checked={checked}
 *   onToggleCheck={toggleCheck}
 * />
 */
export const TreeFolderItem = ({ node, checked, onToggleCheck }: TreeFolderItemProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Box gap="xs" padding="0">
      <Box flexDirection="row" gap="xs" padding="0">
        {/* Checkbox uniquement pour les dossiers untracked —
            Git ne track pas les dossiers modifiés/supprimés en tant qu'entité. */}
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
          onToggle={() => setOpen(!open)}
          ariaLabel={open ? "Fermer le dossier" : "Ouvrir le dossier"}
          size="xs"
          color="rgb(255, 193, 7)" // TODO : remplacer par un token de couleur
        />

        <Text>{node.name}</Text>
      </Box>

      {open &&
        node.children.map((child) => (
          <TreeNodeItem
            key={child.path}
            node={child}
            checked={checked}
            onToggleCheck={onToggleCheck}
          />
        ))}
    </Box>
  );
};