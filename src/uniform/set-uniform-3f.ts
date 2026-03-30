import { BaseOptions } from "../option"

export interface Uniform3fOptions extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uColor")
   */
  name: string

  /**
   * First component (e.g. red)
   */
  x: number

  /**
   * Second component (e.g. green)
   */
  y: number

  /**
   * Third component (e.g. blue)
   */
  z: number

  /**
   * Throw error if uniform location is not found
   *
   * @default false
   */
  strict?: boolean
}

/**
 * Set a vec3 uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `x` – First component
 *    - `y` – Second component
 *    - `z` – Third component
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * // Set the uniform to red
 * setUniform3f(context, program, {
 *   name: "uColor",
 *   x: 1.0,
 *   y: 0.0,
 *   z: 0.0
 * })
 *
 * // Change dynamically, e.g. to green, with strict mode enabled
 * setUniform3f(context, program, {
 *   name: "uColor",
 *   x: 0.0,
 *   y: 1.0,
 *   z: 0.0,
 *   strict: true
 * })
 * ```
 */
export function setUniform3f(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform3fOptions
): void {
  const { name, x, y, z, strict = false } = options

  const location = context.getUniformLocation(program, name)

  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  context.uniform3f(location, x, y, z)
}
