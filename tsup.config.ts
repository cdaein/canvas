import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: "esm",
  target: "esnext",
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // minify: true,
  external: ["@daeinc/dom"],
});
