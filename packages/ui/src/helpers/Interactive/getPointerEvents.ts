import { POINTER_EVENTS, PointerEvents } from "@workspace/ui/constants";

/**
 * Retourne la valeur CSS de `pointer-events`.
 *
 * @param pointerEvents - Token d'événements souris
 * @returns Valeur CSS ou `undefined`
 */
export const getPointerEvents = (pointerEvents?: PointerEvents): PointerEvents | undefined => pointerEvents;