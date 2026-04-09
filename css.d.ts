/**
 * Déclare les modules CSS pour TypeScript.
 * * Lorsque vous importez un fichier .module.css, TypeScript
 * s'attendra à un objet de type Record<string, string>.
 */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}