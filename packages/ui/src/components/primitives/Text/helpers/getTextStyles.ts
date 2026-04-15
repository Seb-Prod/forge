import {
  getTextDecoration,
  getTextLigneHeight,
  getTextSize,
  getTextWeight,
  getToneColor,
} from "@workspace/ui/helpers";
import { TextProps } from "../Text.types";

// 🚀 Variants (optionnel mais très utile)
const VARIANT_MAP = {
  body: { size: "md", weight: "regular" },
  caption: { size: "sm", weight: "regular" },
  label: { size: "sm", weight: "medium" },
  title: { size: "2xl", weight: "semibold" },
} as const;

export const getTextStyle = (props: TextProps): React.CSSProperties => {
  let computedProps = { ...props };

  // 🎯 Apply variant
  if (props.variant) {
    computedProps = {
      ...VARIANT_MAP[props.variant],
      ...computedProps, // override possible
    };
  }

  const size = computedProps.size;

  return {
    fontSize: size ? getTextSize(size) : undefined,
    fontWeight: computedProps.weight
      ? getTextWeight(computedProps.weight)
      : undefined,

    // 🔥 line-height auto + override
    lineHeight:
      computedProps.lineHeight ? getTextLigneHeight(computedProps.lineHeight) : undefined,

    textAlign: computedProps.align,
    textTransform: computedProps.transform,
    fontStyle: computedProps.italic ? "italic" : undefined,
    textDecorationLine: getTextDecoration(computedProps.decoration),

    // 🎨 priorité couleur
    color: computedProps.color
      ? computedProps.color
      : computedProps.tone
      ? getToneColor(computedProps.tone, computedProps.intensity)
      : undefined,

    // ✂️ truncate
    ...(computedProps.truncate && {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }),

    // 📏 line clamp
    ...(computedProps.lineClamp && {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: computedProps.lineClamp,
    }),

    ...computedProps.style,
  };
};