import { BaseOptions } from "../option"

export interface Uniform2fOptions extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uResolution")
   */
  name: string

  /**
   * First component (e.g. width)
   */
  x: number

  /**
   * Second component (e.g. height)
   */
  y: number

  /**
   * Throw error if uniform location is not found
   *
   * @default false
   */
  strict?: boolean
}

/**
 * Set a vec2 uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `x` – First component
 *    - `y` – Second component
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * // Set the resolution uniform to canvas size
 * setUniform2f(context, program, {
 *   name: "uResolution",
 *   x: canvas.width,
 *   y: canvas.height
 * })
 *
 * // Use for offsets or directions, with strict mode enabled
 * setUniform2f(context, program, {
 *   name: "uOffset",
 *   x: 10.0,
 *   y: 20.0,
 *   strict: true
 * })
 * ```
 */
export function setUniform2f(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform2fOptions
): void {
  const { name, x, y, strict = false } = options

  const location = context.getUniformLocation(program, name)

  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  context.uniform2f(location, x, y)
}
