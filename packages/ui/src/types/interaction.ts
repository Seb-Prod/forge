import { Cursor, PointerEvents } from "../constants";

/** Props d'interaction — curseur et gestion des événements pointeur. */
export interface InteractiveProps {
  cursor?: Cursor;
  pointerEvents?: PointerEvents;
}