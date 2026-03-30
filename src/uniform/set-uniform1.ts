import type { BaseOptions } from "../option"

export interface Uniform1Options extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uTime", "uEnabled")
   */
  name: string

  /**
   * Value to assign (float or int)
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
 * Set a single-component uniform (float or int) in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `value` – Float or integer value
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * // Float uniform
 * setUniform1(context, program, {
 *   name: "uTime",
 *   value: performance.now() / 1000
 * })
 *
 * // Integer uniform (boolean flag)
 * setUniform1(context, program, {
 *   name: "uEnabled",
 *   value: 1,
 *   strict: true
 * })
 * ```
 */
export function setUniform1(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform1Options
): void {
  const { name, value, strict = false } = options

  const location = context.getUniformLocation(program, name)
  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  if (Number.isInteger(value)) {
    context.uniform1i(location, value)
  } else {
    context.uniform1f(location, value)
  }
}
