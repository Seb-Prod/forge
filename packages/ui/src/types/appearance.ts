import {
  BorderSize,
  ComponentSize,
  Radius,
  Spacing,
  Surface,
  TextSize,
  Tone,
  Variant,
} from "../constants";
import { CornerRadius } from "../constants/ui/types";

/** Props d'apparence visuelle — couleurs, bordures, ombres et formes. */
export interface SurfaceAppearanceProps {
  surface?: Surface;
  tone?: Tone;
  border?: BorderSize;
  shadow?: boolean;
  /** Token simple ou objet par coin `{ topLeft, topRight, bottomLeft, bottomRight }`. */
  radius?: CornerRadius<Radius>;
  opacity?: number;
}


