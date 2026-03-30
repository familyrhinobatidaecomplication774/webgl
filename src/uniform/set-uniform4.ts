import { BaseOptions } from "../option"

export interface Uniform4Options extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uLight", "uVector")
   */
  name: string

  /**
   * First component
   */
  x: number

  /**
   * Second component
   */
  y: number

  /**
   * Third component
   */
  z: number

  /**
   * Fourth component
   */
  w: number

  /**
   * Throw error if uniform location is not found
   *
   * @default false
   */
  strict?: boolean
}

/**
 * Set a vec4 uniform (float or int) in a WebGL shader program
 *
 * Automatically detects type:
 * - If all values are integers → uniform4i
 * - Otherwise → uniform4f
 *
 * **Usage**
 * ```ts
 * // Float vec4 (light direction)
 * setUniform4(context, program, {
 *   name: "uLight",
 *   x: 1.0,
 *   y: 0.0,
 *   z: 0.0,
 *   w: 1.0
 * })
 *
 * // Integer vec4 (e.g. RGBA as ints)
 * setUniform4(context, program, {
 *   name: "uColorInt",
 *   x: 255,
 *   y: 128,
 *   z: 64,
 *   w: 32,
 *   strict: true
 * })
 * ```
 */
export function setUniform4(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform4Options
): void {
  const { name, x, y, z, w, strict = false } = options

  const location = context.getUniformLocation(program, name)
  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  if (Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z) && Number.isInteger(w)) {
    context.uniform4i(location, x, y, z, w)
  } else {
    context.uniform4f(location, x, y, z, w)
  }
}
