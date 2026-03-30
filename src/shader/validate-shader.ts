import type { BaseOptions } from "../option"
import { handleError } from "../utility/handle-error"

/**
 * Validate whether a WebGL shader compiled successfully
 *
 * **Parameters**
 * - `context` – WebGL rendering context
 * - `shader` – Shader object to validate
 * - `options` – Optional configuration
 *    - `strict` – Throw error if validation fails (default: false)
 *
 * **Usage**
 * ```ts
 * // Compile a shader
 * const vertexShader = compileShader(context, {
 *   source: vsSource,
 *   type: context.VERTEX_SHADER
 * })
 *
 * // Silent mode (default): returns false if validation fails
 * if (!validateShader(context, vertexShader)) {
 *   console.error("Vertex shader failed to compile")
 * }
 *
 * // Strict mode: throws an error if validation fails
 * validateShader(context, vertexShader, { strict: true })
 * ```
 */
export function validateShader(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  shader: WebGLShader | null,
  options: BaseOptions = {}
): boolean {
  const { strict = false } = options

  // Shader reference is null → creation failed or deleted
  if (!shader) {
    handleError({
      subject : "shader",
      context : {
        action  : "validateShader",
        result  : "Shader reference is null (creation failed or deleted)"
      },
      strict  : strict
    })
    return false
  }

  // Query compilation status from WebGL
  const status = context.getShaderParameter(shader, context.COMPILE_STATUS)

  // Compilation failed → report error with detailed info log
  if (!status) {
    const infoLog = context.getShaderInfoLog(shader) || "No compilation log available"
    handleError({
      subject : "shader",
      context : {
        action  : "validateShader",
        result  : "Shader compilation failed",
        details : infoLog
      },
      strict  : strict
    })
    return false
  }

  // Compilation succeeded
  return true
}