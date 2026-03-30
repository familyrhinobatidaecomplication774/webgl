import type { BaseOptions } from "../option"

export interface Uniform1fOptions extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uTime")
   */
  name: string

  /**
   * Float value to assign
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
 * Set a float uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `value` – Float value to assign
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * setUniform1f(context, program, {
 *   name: "uTime",
 *   value: performance.now() / 1000
 * })
 *
 * setUniform1f(context, program, {
 *   name: "uIntensity",
 *   value: 0.75,
 *   strict: true
 * })
 * ```
 */
export function setUniform1f(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform1fOptions
): void {
  const { name, value, strict = false } = options

  const location = context.getUniformLocation(program, name)

  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  context.uniform1f(location, value)
}
