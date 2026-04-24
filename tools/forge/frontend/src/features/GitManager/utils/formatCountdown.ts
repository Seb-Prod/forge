/**
 * Convertit un délai en millisecondes en libellé temporel lisible.
 *
 * @param ms - Délai restant en millisecondes, ou `null` si le timer est inactif.
 * @param inProgressLabel - Libellé affiché quand le délai est ≤ 1 s.
 * @defaultValue `"Synchronisation…"`
 * @returns Chaîne localisée décrivant l'état du timer.
 */
export const formatCountdown = (
  ms: number | null,
  inProgressLabel = "Synchronisation…",
): string => {
  if (ms === null) return "Auto-refresh désactivé";

  const seconds = Math.ceil(ms / 1000);

  if (seconds <= 1) return inProgressLabel;
  if (seconds <= 3) return "Mise à jour imminente";
  if (seconds <= 10) return `Actualisation dans ${seconds}s`;

  return `Prochaine mise à jour dans ${seconds}s`;
};
