import { BaseOptions } from "../option"

export interface Uniform1iOptions extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uEnabled" or "uTexture")
   */
  name: string

  /**
   * Integer value (0/1 for boolean, or texture unit index)
   */
  value: number

  /**
   * Throw error if uniform location is not found
   *
   * @default false
   */
  strict?: boolean
}

/**
 * Set an integer/boolean uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `value` – Integer value (0/1 for boolean, or texture unit index)
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * // Enable a feature flag
 * setUniform1i(context, program, {
 *   name: "uEnabled",
 *   value: 1
 * })
 *
 * // Bind texture to unit 0 and assign sampler
 * context.activeTexture(context.TEXTURE0)
 * context.bindTexture(context.TEXTURE_2D, texture)
 * setUniform1i(context, program, {
 *   name: "uTexture",
 *   value: 0,
 *   strict: true
 * })
 * ```
 */
export function setUniform1i(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform1iOptions
): void {
  const { name, value, strict = false } = options

  const location = context.getUniformLocation(program, name)

  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  context.uniform1i(location, value)
}
