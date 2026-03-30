import { BaseOptions } from "../option"

export interface Uniform2Options extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uResolution", "uOffset")
   */
  name: string

  /**
   * First component (e.g. width or x)
   */
  x: number

  /**
   * Second component (e.g. height or y)
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
 * Set a vec2 uniform (float or int) in a WebGL shader program
 *
 * Automatically detects type:
 * - If both values are integers → uniform2i
 * - Otherwise → uniform2f
 *
 * **Usage**
 * ```ts
 * // Float vec2 (resolution)
 * setUniform2(context, program, {
 *   name: "uResolution",
 *   x: canvas.width,
 *   y: canvas.height
 * })
 *
 * // Integer vec2 (e.g. grid coordinates)
 * setUniform2(context, program, {
 *   name: "uGridPos",
 *   x: 10,
 *   y: 20,
 *   strict: true
 * })
 * ```
 */
export function setUniform2(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform2Options
): void {
  const { name, x, y, strict = false } = options

  const location = context.getUniformLocation(program, name)
  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  if (Number.isInteger(x) && Number.isInteger(y)) {
    context.uniform2i(location, x, y)
  } else {
    context.uniform2f(location, x, y)
  }
}
