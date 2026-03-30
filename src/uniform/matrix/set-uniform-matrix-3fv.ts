import type { BaseOptions } from "../../option"
import { handleError } from "../../error"

export interface UniformMatrix3Options extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uNormalMatrix")
   */
  name: string

  /**
   * 3×3 matrix as a Float32Array
   */
  matrix: Float32Array

  /**
   * Transpose the matrix before sending to shader
   *
   * @default false
   */
  transpose?: boolean
}

/**
 * Set a mat3 uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `matrix` – 3×3 matrix as a Float32Array
 *    - `transpose` – Whether to transpose the matrix (default: false)
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * const normalMatrix = new Float32Array([
 *   1, 0, 0,
 *   0, 1, 0,
 *   0, 0, 1
 * ])
 *
 * // Default usage
 * setUniformMatrix3fv(context, program, {
 *   name: "uNormalMatrix",
 *   matrix: normalMatrix
 * })
 *
 * // With transpose and strict mode enabled
 * setUniformMatrix3fv(context, program, {
 *   name: "uNormalMatrix",
 *   matrix: normalMatrix,
 *   transpose: true,
 *   strict: true
 * })
 * ```
 */
export function setUniformMatrix3fv(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: UniformMatrix3Options
): void {
  const { name, matrix, transpose = false, strict = false } = options

  // Find the uniform location in the shader program
  const location = context.getUniformLocation(program, name)

  // If uniform is not found, delegate to centralized error handler
  if (location === null) {
    handleError({
      subject : "uniform",
      context : {
        action  : "setUniformMatrix3fv",
        result  : `Uniform "${name}" not found in shader program`
      },
      strict  : strict
    })
    return
  }

  // Apply the matrix to the uniform
  context.uniformMatrix3fv(location, transpose, matrix)
}
