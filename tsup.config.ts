import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry       : ["src/**/*.ts"],
  format      : ["esm"],
  dts         : true,
  minify      : true,
  clean       : true,
  external    : ["react","vue","nuxt","next","clsx","class-variance-authority"],
  ...options
}))
