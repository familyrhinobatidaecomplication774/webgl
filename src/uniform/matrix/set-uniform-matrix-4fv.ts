import type { BaseOptions } from "../../option"
import { handleError } from "../../error"

export interface UniformMatrix4Options extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uProjection")
   */
  name: string

  /**
   * 4×4 matrix as a Float32Array
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
 * Set a mat4 uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `matrix` – 4×4 matrix as a Float32Array
 *    - `transpose` – Whether to transpose the matrix (default: false)
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * const projectionMatrix = new Float32Array([
 *   1, 0, 0, 0,
 *   0, 1, 0, 0,
 *   0, 0, 1, 0,
 *   0, 0, 0, 1
 * ])
 *
 * // Default usage
 * setUniformMatrix4fv(context, program, {
 *   name: "uProjection",
 *   matrix: projectionMatrix
 * })
 *
 * // With transpose and strict mode enabled
 * setUniformMatrix4fv(context, program, {
 *   name: "uProjection",
 *   matrix: projectionMatrix,
 *   transpose: true,
 *   strict: true
 * })
 * ```
 */
export function setUniformMatrix4fv(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: UniformMatrix4Options
): void {
  const { name, matrix, transpose = false, strict = false } = options

  // Find the uniform location in the shader program
  const location = context.getUniformLocation(program, name)

  // If uniform is not found, delegate to centralized error handler
  if (location === null) {
    handleError({
      subject : "uniform",
      context : {
        action  : "setUniformMatrix4fv",
        result  : `Uniform "${name}" not found in shader program`
      },
      strict  : strict
    })
    return
  }

  // Apply the matrix to the uniform
  context.uniformMatrix4fv(location, transpose, matrix)
}
