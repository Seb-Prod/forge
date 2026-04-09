import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@workspace/ui": path.resolve(__dirname, "../../packages/ui/src"),

      "@workspace/ui/components": path.resolve(
        __dirname,
        "../../packages/ui/src/components",
      ),
      "@workspace/ui/constants": path.resolve(
        __dirname,
        "../../packages/ui/src/constants",
      ),
      "@workspace/ui/contexts": path.resolve(
        __dirname,
        "../../packages/ui/src/contexts",
      ),
      "@workspace/ui/features": path.resolve(
        __dirname,
        "../../packages/ui/src/features",
      ),
      "@workspace/ui/functions": path.resolve(
        __dirname,
        "../../packages/ui/src/functions",
      ),
      "@workspace/ui/hooks": path.resolve(
        __dirname,
        "../../packages/ui/src/hooks",
      ),
      "@workspace/ui/layouts": path.resolve(
        __dirname,
        "../../packages/ui/src/layouts",
      ),
      "@workspace/ui/pages": path.resolve(
        __dirname,
        "../../packages/ui/src/pages",
      ),
      "@workspace/ui/router": path.resolve(
        __dirname,
        "../../packages/ui/src/router",
      ),
      "@workspace/ui/utils": path.resolve(
        __dirname,
        "../../packages/ui/src/utils",
      ),
    },
  },
});
