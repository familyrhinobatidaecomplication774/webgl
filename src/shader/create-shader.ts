import type { BaseOptions } from "../option"
import { handleError } from "../utility/handle-error"

/**
 * Configuration options for creating a WebGL shader object
 */
export interface CreateShaderOptions extends BaseOptions {
  /**
   * Shader type to create (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
   */
  type: number
}

/**
 * Create a WebGL shader object with the given rendering context
 *
 * **Parameters**
 * - `context` – WebGL rendering context (WebGL1 or WebGL2)
 * - `options` – Shader configuration
 *    - `type` – Shader type (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
 *    - `strict` – Throw error if shader creation fails (default: false)
 *
 * **Usage**
 * ```ts
 * // Silent mode (default): returns null if shader cannot be created
 * const vertexShader = createShader(context, { type: context.VERTEX_SHADER })
 *
 * // Strict mode: throws an error if shader cannot be created
 * const fragmentShader = createShader(context, {
 *   type: context.FRAGMENT_SHADER,
 *   strict: true
 * })
 * ```
 */
export function createShader(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  options: CreateShaderOptions
): WebGLShader | null {
  const { type, strict = false } = options

  const shader = context.createShader(type)

  // Shader creation failed → report error
  if (!shader) {
    handleError({
      subject : "shader",
      context : {
        action  : "createShader",
        result  : `Failed to create shader of type ${type}`
      },
      strict  : strict
    })
    return null
  }

  // Shader created successfully
  return shader
}
