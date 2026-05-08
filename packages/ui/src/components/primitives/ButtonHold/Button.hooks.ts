import { Appearance, Animation } from "@workspace/ui/constants";
import { MouseEvent } from "react";


type UseActionParams = {
  appearance: Appearance;
  animation?: Animation;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: MouseEvent<any>) => void;
};

export function useAction({
  appearance,
  animation,
  disabled,
  loading,
  onClick,
}: UseActionParams) {
  const defaultAnimationMap: Partial<
    Record<Appearance, Animation>
  > = {
    ghost: "center",
    outline: "left",
  };

  const finalAnimation =
    animation === "none"
      ? undefined
      : animation ?? defaultAnimationMap[appearance];

  const handleClick = (e: MouseEvent<any>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return {
    finalAnimation,
    handleClick,
    isDisabled: disabled || loading,
  };
}