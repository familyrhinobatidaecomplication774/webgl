import { BaseOptions } from "../option"
import { handleError } from "../error"

/**
 * Configuration options for setting a matrix uniform (mat2, mat3, or mat4)
 */
export interface UniformMatrixOptions extends BaseOptions {
  /**
   * Uniform name in the shader
   */
  name: string

  /**
   * Matrix values as a Float32Array
   */
  matrix: Float32Array

  /**
   * Whether to transpose the matrix before uploading
   *
   * @default false
   */
  transpose?: boolean
}

/**
 * Set a matrix uniform (mat2, mat3, mat4, or non-square variants) in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context (WebGL1 or WebGL2)
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `matrix` – Matrix as a Float32Array
 *    - `transpose` – Whether to transpose the matrix (default: false)
 *    - `strict` – Throw error if uniform location or type is not found (default: false)
 *
 * **Usage**
 * ```ts
 * // WebGL1: 2×2 identity matrix
 * const mat2 = new Float32Array([1, 0, 0, 1])
 * setUniformMatrix(context, program, {
 *   name: "uMat2",
 *   matrix: mat2
 * })
 *
 * // WebGL1: 3×3 identity matrix with strict mode
 * const mat3 = new Float32Array([1,0,0, 0,1,0, 0,0,1])
 * setUniformMatrix(context, program, {
 *   name: "uMat3",
 *   matrix: mat3,
 *   strict: true
 * })
 *
 * // WebGL1: 4×4 identity matrix with transpose
 * const mat4 = new Float32Array([
 *   1,0,0,0,
 *   0,1,0,0,
 *   0,0,1,0,
 *   0,0,0,1
 * ])
 * setUniformMatrix(context, program, {
 *   name: "uMat4",
 *   matrix: mat4,
 *   transpose: true
 * })
 *
 * // WebGL2: non-square matrix (mat2x3)
 * const mat2x3 = new Float32Array([1,0,0, 0,1,0])
 * setUniformMatrix(gl2Context, program, {
 *   name: "uMat2x3",
 *   matrix: mat2x3
 * })
 *
 * // WebGL2: non-square matrix (mat3x2)
 * const mat3x2 = new Float32Array([1,0,0, 0,1,0])
 * setUniformMatrix(gl2Context, program, {
 *   name: "uMat3x2",
 *   matrix: mat3x2
 * })
 * ```
 */
export function setUniformMatrix(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: UniformMatrixOptions
): void {
  const { name, matrix, transpose = false, strict = false } = options

  // Get the uniform location from the shader program by name
  const location = context.getUniformLocation(program, name)

  // If the uniform location is not found, handle the error
  if (location === null) {
    handleError({
      subject : "uniform",
      context : {
        action  : "setUniformMatrix",
        result  : `Uniform "${name}" not found`
      },
      strict  : strict
    })
    return
  }

  // Query the program for the number of active uniforms
  const numUniforms = context.getProgramParameter(program, context.ACTIVE_UNIFORMS)

  // Iterate through active uniforms to find the one matching the given name
  let uniformInfo: WebGLActiveInfo | null = null
  for (let i = 0; i < numUniforms; i++) {
    const info = context.getActiveUniform(program, i)
    if (info?.name === name) {
      uniformInfo = info
      break
    }
  }

  // If no uniform info is found, handle the error
  if (!uniformInfo) {
    handleError({
      subject : "uniform",
      context : {
        action  :"setUniformMatrix",
        result  :`Uniform info for "${name}" not found`
      },
      strict  : strict
    })
    return
  }

  // Dispatch to the correct WebGL function based on the uniform type
  switch (uniformInfo.type) {
    // Square matrices (available in WebGL1 and WebGL2)
    case context.FLOAT_MAT2: context.uniformMatrix2fv(location, transpose, matrix); break
    case context.FLOAT_MAT3: context.uniformMatrix3fv(location, transpose, matrix); break
    case context.FLOAT_MAT4: context.uniformMatrix4fv(location, transpose, matrix); break

    // Non-square matrices (available only in WebGL2)
    case (context as WebGL2RenderingContext).FLOAT_MAT2x3:
      (context as WebGL2RenderingContext).uniformMatrix2x3fv(location, transpose, matrix); break
    case (context as WebGL2RenderingContext).FLOAT_MAT3x2:
      (context as WebGL2RenderingContext).uniformMatrix3x2fv(location, transpose, matrix); break
    case (context as WebGL2RenderingContext).FLOAT_MAT2x4:
      (context as WebGL2RenderingContext).uniformMatrix2x4fv(location, transpose, matrix); break
    case (context as WebGL2RenderingContext).FLOAT_MAT4x2:
      (context as WebGL2RenderingContext).uniformMatrix4x2fv(location, transpose, matrix); break
    case (context as WebGL2RenderingContext).FLOAT_MAT3x4:
      (context as WebGL2RenderingContext).uniformMatrix3x4fv(location, transpose, matrix); break
    case (context as WebGL2RenderingContext).FLOAT_MAT4x3:
      (context as WebGL2RenderingContext).uniformMatrix4x3fv(location, transpose, matrix); break

    // If the type is unsupported, handle the error
    default:
      handleError({
        subject : "uniform",
        context : {
          action  :"setUniformMatrix",
          result  :`Unsupported uniform type for "${name}"`
        },
        strict  : strict
      })
  }
}
