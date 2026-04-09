import { DocsConfig } from "../Showcase.types";

/**
 * Helper permettant de typer automatiquement la documentation
 * d'un composant à partir de ses Props.
 *
 * Exemple :
 * const CheckboxDocs = createDocs<CheckboxProps>()({...})
 */
export const createDocs =
  <T extends Record<string, any>>() =>
  <C extends DocsConfig<T>>(config: C): C =>
    config;