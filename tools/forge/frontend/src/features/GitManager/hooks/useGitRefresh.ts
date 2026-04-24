import { useCallback, useEffect, useRef, useState } from "react";
import {
  LOCAL_REFRESH_INTERVAL,
  REMOTE_REFRESH_INTERVAL,
  STATUS_REFRESH_INTERVAL,
} from "./useGitRepositoryData";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Handlers = {
  /** Récupère l'arbre des branches locales */
  handleLocalTree: () => Promise<void>;
  /** Récupère l'arbre des branches distantes */
  handleRemoteTree: () => Promise<void>;
  /** Récupère le statut des fichiers (modifications locales) */
  handleStatus: () => Promise<void>;
};

type UseGitRefreshReturn = {
  /** Active / désactive le refresh automatique des branches locales */
  localEnabled: boolean;
  setLocalEnabled: (v: boolean) => void;
  /** Active / désactive le refresh automatique des branches distantes */
  remoteEnabled: boolean;
  setRemoteEnabled: (v: boolean) => void;
  /** Active / désactive le refresh automatique du statut */
  statusEnabled: boolean;
  setStatusEnabled: (v: boolean) => void;
  /** Millisecondes avant le prochain refresh local. `null` si désactivé */
  localRemaining: number | null;
  /** Millisecondes avant le prochain refresh remote. `null` si désactivé */
  remoteRemaining: number | null;
  /** Millisecondes avant le prochain refresh status. `null` si désactivé */
  statusRemaining: number | null;
  /** Déclenche un refresh immédiat du statut et remet le countdown à zéro */
  triggerStatusRefresh: () => Promise<void>;
  isRefreshingStatus: boolean;
};

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

/**
 * Gère les refresh périodiques des données Git (local, remote, status)
 * et expose les countdowns restants en millisecondes.
 *
 * Stratégie :
 * - Un seul `setInterval` à 1s (le "tick") lit les refs pour calculer
 *   les countdowns — évite les stale closures sans recréer l'intervalle.
 * - Les flags `enabled` sont synchronisés dans des refs pour être lisibles
 *   par le tick sans dépendances de closure.
 * - Le tick retourne `null` directement quand un canal est désactivé,
 *   sans passer par un `setState` synchrone dans un effet.
 */
export const useGitRefresh = ({
  handleLocalTree,
  handleRemoteTree,
  handleStatus,
}: Handlers): UseGitRefreshReturn => {
  // ── États enabled (UI) ──────────────────────────────────────────────

  const [localEnabled, setLocalEnabledState] = useState(true);
  const [remoteEnabled, setRemoteEnabledState] = useState(true);
  const [statusEnabled, setStatusEnabledState] = useState(true);

  // ── Refs enabled (lecture dans le tick sans stale closure) ──────────

  const localEnabledRef = useRef(true);
  const remoteEnabledRef = useRef(true);
  const statusEnabledRef = useRef(true);

  //

  const [isRefreshingStatus, setIsRefreshingStatus] = useState(false);

  /**
   * Setters wrappés : synchronisent la ref ET le state en une seule opération.
   * La ref est lue par le tick (pas de dépendance), le state déclenche le re-render.
   */
  const setLocalEnabled = useCallback((v: boolean) => {
    localEnabledRef.current = v;
    setLocalEnabledState(v);
  }, []);

  const setRemoteEnabled = useCallback((v: boolean) => {
    remoteEnabledRef.current = v;
    setRemoteEnabledState(v);
  }, []);

  const setStatusEnabled = useCallback((v: boolean) => {
    statusEnabledRef.current = v;
    setStatusEnabledState(v);
  }, []);

  // ── Countdowns (ms avant le prochain refresh) ───────────────────────

  const [localRemaining, setLocalRemaining] = useState<number | null>(0);
  const [remoteRemaining, setRemoteRemaining] = useState<number | null>(0);
  const [statusRemaining, setStatusRemaining] = useState<number | null>(0);

  // ── Timestamps des prochains refresh ────────────────────────────────

  /** Timestamp Unix (ms) du prochain refresh local */
  const nextLocalRef = useRef(0);
  /** Timestamp Unix (ms) du prochain refresh remote */
  const nextRemoteRef = useRef(0);
  /** Timestamp Unix (ms) du prochain refresh status */
  const nextStatusRef = useRef(0);

  // ── Guard d'initialisation ───────────────────────────────────────────

  /** Empêche un double appel initial en mode StrictMode React */
  const initializedRef = useRef(false);

  // ─────────────────────────────────────────────
  // Helpers internes
  // ─────────────────────────────────────────────

  /**
   * Exécute le refresh du status et met à jour le timestamp suivant.
   * Mémoïsé pour être une dépendance stable des effets.
   */
  const triggerStatusRefresh = useCallback(async () => {
    setIsRefreshingStatus(true);

    try {
      await handleStatus();
    } finally {
      setIsRefreshingStatus(false);
    }
    nextStatusRef.current = Date.now() + STATUS_REFRESH_INTERVAL * 1000;
  }, [handleStatus]);

  // ─────────────────────────────────────────────
  // Effets
  // ─────────────────────────────────────────────

  /**
   * INIT — déclenche un premier fetch immédiat pour chaque canal
   * et initialise les timestamps des prochains refresh.
   */
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const now = Date.now();
    nextLocalRef.current = now + LOCAL_REFRESH_INTERVAL * 1000;
    nextRemoteRef.current = now + REMOTE_REFRESH_INTERVAL * 1000;
    nextStatusRef.current = now + STATUS_REFRESH_INTERVAL * 1000;

    handleLocalTree();
    handleRemoteTree();
    handleStatus();
  }, [handleLocalTree, handleRemoteTree, handleStatus]);

  /**
   * INTERVAL LOCAL — refresh périodique de l'arbre local.
   * Se recrée uniquement si `localEnabled` ou le handler change.
   */
  useEffect(() => {
    if (!localEnabled) return;

    const id = setInterval(async () => {
      await handleLocalTree();
      nextLocalRef.current = Date.now() + LOCAL_REFRESH_INTERVAL * 1000;
    }, LOCAL_REFRESH_INTERVAL * 1000);

    return () => clearInterval(id);
  }, [localEnabled, handleLocalTree]);

  /**
   * INTERVAL REMOTE — refresh périodique de l'arbre distant.
   * Se recrée uniquement si `remoteEnabled` ou le handler change.
   */
  useEffect(() => {
    if (!remoteEnabled) return;

    const id = setInterval(async () => {
      await handleRemoteTree();
      nextRemoteRef.current = Date.now() + REMOTE_REFRESH_INTERVAL * 1000;
    }, REMOTE_REFRESH_INTERVAL * 1000);

    return () => clearInterval(id);
  }, [remoteEnabled, handleRemoteTree]);

  /**
   * INTERVAL STATUS — refresh périodique du statut des fichiers.
   * Déclenche un refresh immédiat à l'activation, puis à intervalle régulier.
   * Quand désactivé, remet le timestamp à 0 (le tick retournera `null`).
   */
  useEffect(() => {
    if (!statusEnabled) {
      nextStatusRef.current = 0;
      return;
    }

    triggerStatusRefresh();

    const id = setInterval(
      triggerStatusRefresh,
      STATUS_REFRESH_INTERVAL * 1000,
    );

    return () => clearInterval(id);
  }, [statusEnabled, triggerStatusRefresh]);

  /**
   * TICK — cadence à 1s pour mettre à jour les countdowns.
   *
   * Lit les refs `*EnabledRef` pour éviter les stale closures :
   * le tick ne se recrée jamais, ce qui garantit un countdown continu
   * même lors des toggles. `null` est retourné directement quand un
   * canal est désactivé — sans `setState` synchrone dans un effet.
   */
  useEffect(() => {
    const tick = () => {
      const now = Date.now();

      setLocalRemaining(
        localEnabledRef.current
          ? Math.max(0, nextLocalRef.current - now)
          : null,
      );
      setRemoteRemaining(
        remoteEnabledRef.current
          ? Math.max(0, nextRemoteRef.current - now)
          : null,
      );
      setStatusRemaining(
        statusEnabledRef.current
          ? Math.max(0, nextStatusRef.current - now)
          : null,
      );
    };

    tick();
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, []); // dépendances vides : le tick lit des refs, jamais des states

  // ─────────────────────────────────────────────
  // Retour
  // ─────────────────────────────────────────────

  return {
    localEnabled,
    setLocalEnabled,
    remoteEnabled,
    setRemoteEnabled,
    statusEnabled,
    setStatusEnabled,
    localRemaining,
    remoteRemaining,
    statusRemaining,
    triggerStatusRefresh,
    isRefreshingStatus,
  };
};
