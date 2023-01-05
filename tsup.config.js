import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: "esm",
  target: "esnext",
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  // minify: true,
  external: ["@daeinc/dom"],
});
