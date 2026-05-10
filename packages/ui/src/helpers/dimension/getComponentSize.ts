import { COMPONENT_SIZES, ComponentSize } from "@workspace/ui/constants";

export const getComponentSize = (componentSize?: ComponentSize): string => {
    if (componentSize === undefined) return "none";
    return `${COMPONENT_SIZES[componentSize].value}`;
}