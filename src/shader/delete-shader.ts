import type { BaseOptions } from "../option"
import { handleError } from "../utility/handle-error"

/**
 * Delete a WebGL shader object and free GPU resources
 *
 * **Parameters**
 * - `context` – WebGL rendering context (WebGL1 or WebGL2)
 * - `shader` – Shader object to delete
 * - `options` – Optional configuration
 *    - `strict` – Throw error if shader is null or deletion fails (default: false)
 *
 * **Usage**
 * ```ts
 * // Silent mode (default): ignores if shader is null
 * deleteShader(context, vertexShader)
 *
 * // Strict mode: throws an error if shader is null
 * deleteShader(context, fragmentShader, { strict: true })
 * ```
 */
export function deleteShader(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  shader: WebGLShader | null,
  options: BaseOptions = {}
): void {
  const { strict = false } = options

  // Shader reference is null → report error
  if (!shader) {
    handleError({
      subject : "shader",
      context : {
        action  : "deleteShader",
        result  : "Shader reference is null (never created, already deleted, or lost)"
      },
      strict  : strict
    })
    return
  }

  // Delete the shader and free GPU resources
  context.deleteShader(shader)
}
