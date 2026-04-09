import { TONES } from "@workspace/ui/constants";
import { DocsConfig } from "@workspace/ui/features";
import { DEFAULT_PROPS } from "../Box.types";

export const BoxDocs: DocsConfig = {
    constants: {
        tone: TONES,
    },

    controls: {
        label: { type: "text", label: "Label"},
    },

    defaultProps: {
        ...DEFAULT_PROPS,
        label: "New Component",
        tone: "neutral",
    },

    propsTable: [
        {
            name: "label",
            type: "string",
            required: true,
            description: "Label affiché",
        },

        {   
            name: "tone",
            type: "SelectTone",
            default: "neutral",
            description: "Tonalité sémantique",
        },
    ]
    
}