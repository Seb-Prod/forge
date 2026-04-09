import { ReactNode } from "react";
import { CardComposition } from "../Card.types";
import React from "react";

function isDevelopment(): boolean {
  try {
    // @ts-ignore - volontairement ignoré
    return typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';
  } catch {
    return true;
  }
}

// Fonction helper pour extraire et organiser les enfants
export function organizeCardChildren(children: ReactNode): CardComposition {
  const composition: CardComposition = {
    warnings: []
  };

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    const displayName = (child.type as any).displayName || (child.type as any).name;

    switch (displayName) {
      case 'CardHeader':
        if (composition.header) {
          composition.warnings.push('⚠️ Plusieurs CardHeader détectés. Seul le premier sera utilisé.');
        } else {
          composition.header = child;
        }
        break;
      case 'CardContent':
        if (composition.content) {
          composition.warnings.push('⚠️ Plusieurs CardContent détectés. Seul le premier sera utilisé.');
        } else {
          composition.content = child;
        }
        break;
      case 'CardFooter':
        if (composition.footer) {
          composition.warnings.push('⚠️ Plusieurs CardFooter détectés. Seul le premier sera utilisé.');
        } else {
          composition.footer = child;
        }
        break;
      default:
        if (displayName) {
          composition.warnings.push(`❌ Composant non autorisé: <${displayName}>`);
        }
    }
  });

  return composition;
}