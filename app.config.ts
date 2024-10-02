import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: () => {
    return {
      server: {
        port: 3002,
      },
    };
  },
});
