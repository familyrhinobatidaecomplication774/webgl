import type { BaseOptions } from "../option"
import { createShader } from "./create-shader"
import { validateShader } from "./validate-shader"
import { handleError } from "../utility/handle-error"

/**
 * Configuration options for compiling a WebGL shader
 */
export interface CompileShaderOptions extends BaseOptions {
  /**
   * GLSL source code string to compile
   */
  source: string

  /**
   * Shader type (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
   */
  type: number
}

/**
 * Compile a WebGL shader with the given source code
 *
 * **Parameters**
 * - `context` – WebGL rendering context to compile the shader in
 * - `options` – Shader configuration
 *    - `source` – GLSL source code
 *    - `type` – Shader type (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
 *    - `strict` – Throw error if shader creation or compilation fails (default: false)
 *
 * **Usage**
 * ```ts
 * // Create and compile a vertex shader
 * const vertexShader = compileShader(context, {
 *   source: vsSource,
 *   type: context.VERTEX_SHADER
 * })
 *
 * // Strict mode: throws an error if compilation fails
 * const fragmentShader = compileShader(context, {
 *   source: fsSource,
 *   type: context.FRAGMENT_SHADER,
 *   strict: true
 * })
 * ```
 */
export function compileShader(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  options: CompileShaderOptions
): WebGLShader | null {
  const { source, type, strict = false } = options

  // Create shader object
  const shader = createShader(context, { type, strict })
  if (!shader) {
    handleError({
      subject : "shader",
      context : {
        action  : "compileShader",
        result  : "Failed to create shader object"
      },
      strict  : strict
    })
    return null
  }

  // Validate source
  if (!source || source.trim().length === 0) {
    handleError({
      subject : "shader",
      context : {
        action  : "compileShader",
        result  : "Shader source code is empty"
      },
      strict  : strict
    })
    return null
  }

  // Attach GLSL source code
  context.shaderSource(shader, source)

  // Compile the shader source
  context.compileShader(shader)

  // Validate compilation result
  if (strict) {
    validateShader(context, shader, { strict: true })
  } else {
    const status = context.getShaderParameter(shader, context.COMPILE_STATUS)
    if (!status) {
      const infoLog = context.getShaderInfoLog(shader) || "No compilation log available"

      handleError({
        subject : "shader",
        context : {
          action  : "compileShader",
          result  : "Shader compilation failed",
          details : infoLog
        },
        strict  : strict
      })
      return null
    }
  }

  // Case 6: Compilation succeeded
  return shader
}