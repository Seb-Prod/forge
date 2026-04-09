/**
 * @type LogLevel
 * @description Niveau de sévérité d'un message de log.
 * - `"info"`  — Information générale
 * - `"warn"`  — Avertissement non bloquant
 * - `"error"` — Erreur critique
 */
type LogLevel = "warn" | "error" | "info";

/**
 * @interface LoggerOptions
 * @description Options de configuration du logger.
 *
 * @property enabled - Active ou désactive les logs. Par défaut `true`.
 * @property prefix  - Préfixe affiché devant chaque message. Par défaut `"UI"`.
 */
interface LoggerOptions {
  enabled?: boolean;
  prefix?: string;
}

/**
 * @constant DEFAULT_OPTIONS
 * @description Options par défaut du logger.
 *
 * @remarks
 * `enabled` est actuellement `true` en permanence.
 * TODO: Conditionner `enabled` à `process.env.NODE_ENV !== "production"`
 * une fois la gestion des variables d'environnement mise en place.
 */
const DEFAULT_OPTIONS: Required<LoggerOptions> = {
  enabled: true,
  prefix: "UI",
};

/**
 * @function createLogger
 * @description Crée une instance de logger avec un préfixe et un niveau d'activation configurables.
 * Les messages sont formatés sous la forme `[prefix] message`.
 *
 * @param options - Options de configuration. Fusionnées avec {@link DEFAULT_OPTIONS}.
 * @returns Objet exposant les méthodes `warn`, `error` et `info`.
 *
 * @example
 * const logger = createLogger({ prefix: "resolveSpacing" });
 *
 * logger.warn("Valeur invalide : banana");
 * // [resolveSpacing] Valeur invalide : banana
 *
 * logger.error("Token introuvable");
 * // [resolveSpacing] Token introuvable
 */
export const createLogger = (options?: LoggerOptions) => {
  const { enabled, prefix } = { ...DEFAULT_OPTIONS, ...options };

  const log = (level: LogLevel, message: string) => {
    if (!enabled) return;

    const formatted = `[${prefix}] ${message}`;

    switch (level) {
      case "warn":
        console.warn(formatted);
        break;
      case "error":
        console.error(formatted);
        break;
      case "info":
        console.info(formatted);
        break;
    }
  };

  return {
    warn:  (msg: string) => log("warn",  msg),
    error: (msg: string) => log("error", msg),
    info:  (msg: string) => log("info",  msg),
  };
};