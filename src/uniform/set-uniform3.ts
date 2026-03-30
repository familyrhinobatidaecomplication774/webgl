import { BaseOptions } from "../option"

export interface Uniform3Options extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uColor", "uCoords")
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
   * Throw error if uniform location is not found
   *
   * @default false
   */
  strict?: boolean
}

/**
 * Set a vec3 uniform (float or int) in a WebGL shader program
 *
 * Automatically detects type:
 * - If all values are integers → uniform3i
 * - Otherwise → uniform3f
 *
 * **Usage**
 * ```ts
 * // Float vec3 (color)
 * setUniform3(context, program, {
 *   name: "uColor",
 *   x: 1.0,
 *   y: 0.0,
 *   z: 0.0
 * })
 *
 * // Integer vec3 (e.g. voxel coordinates)
 * setUniform3(context, program, {
 *   name: "uVoxelPos",
 *   x: 10,
 *   y: 20,
 *   z: 30,
 *   strict: true
 * })
 * ```
 */
export function setUniform3(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform3Options
): void {
  const { name, x, y, z, strict = false } = options

  const location = context.getUniformLocation(program, name)
  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  if (Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z)) {
    context.uniform3i(location, x, y, z)
  } else {
    context.uniform3f(location, x, y, z)
  }
}
