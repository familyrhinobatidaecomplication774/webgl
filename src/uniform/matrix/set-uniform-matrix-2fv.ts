import type { BaseOptions } from "../../option"
import { handleError } from "../../error"

export interface UniformMatrix2Options extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uRotation")
   */
  name: string

  /**
   * 2×2 matrix as a Float32Array
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
 * Set a mat2 uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `matrix` – 2×2 matrix as a Float32Array
 *    - `transpose` – Whether to transpose the matrix (default: false)
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * // Create a rotation matrix (identity in this case)
 * const rotationMatrix = new Float32Array([1, 0, 0, 1])
 *
 * // Default usage (no transpose, silent if uniform not found)
 * setUniformMatrix2fv(context, program, {
 *   name: "uRotation",
 *   matrix: rotationMatrix
 * })
 *
 * // With transpose and strict mode enabled
 * setUniformMatrix2fv(context, program, {
 *   name: "uRotation",
 *   matrix: rotationMatrix,
 *   transpose: true,
 *   strict: true
 * })
 * ```
 */
export function setUniformMatrix2fv(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: UniformMatrix2Options
): void {
  const { name, matrix, transpose = false, strict = false } = options

  // Find the uniform location in the shader program
  const location = context.getUniformLocation(program, name)

  // If uniform is not found, delegate to centralized error handler
  if (location === null) {
    handleError({
      subject : "uniform",
      context : {
        action  : "setUniformMatrix2fv",
        result  : `Uniform "${name}" not found in shader program`
      },
      strict  : strict
    })
    return
  }

  // Apply the matrix to the uniform
  context.uniformMatrix2fv(location, transpose, matrix)
}
