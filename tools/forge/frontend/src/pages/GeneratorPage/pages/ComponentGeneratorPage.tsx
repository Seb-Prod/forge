import { GeneratorForm } from "@/features/generator";
import { componentConfig } from "@/features/generator/config/component";

export const ComponentGeneratorPage = () => (
  <GeneratorForm config={componentConfig} />
);