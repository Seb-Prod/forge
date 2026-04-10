import { forwardRef } from "react";
import { RadioProps } from "./Radio.types";

export const Radio = forwardRef<HTMLElement, RadioProps>((props, ref) => {
  return (
    <div>
      <span>test</span>
    </div>
  );
});
