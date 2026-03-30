import type { BaseOptions } from "../option"
import { handleError } from "../utility/handle-error"

/**
 * Detach a shader from a WebGL program
 *
 * **Parameters**
 * - `context` – WebGL rendering context (WebGL2 only)
 * - `program` – Target WebGL program
 * - `shader` – Shader to detach
 * - `options` – Optional configuration
 *    - `strict` – Throw error if shader or program is null (default: false)
 *
 * **Usage**
 * ```ts
 * // Detach a vertex shader from a program
 * detachShader(context, program, vertexShader)
 *
 * // Detach a fragment shader with strict mode enabled
 * detachShader(context, program, fragmentShader, { strict: true })
 *
 * // Safe usage: check compile result before detaching
 * const shader = compileShader(context, { source: fsSource, type: context.FRAGMENT_SHADER })
 * if (shader) {
 *   detachShader(context, program, shader)
 * }
 * ```
 */
export function detachShader(
  context: WebGL2RenderingContext,
  program: WebGLProgram | null,
  shader: WebGLShader | null,
  options: BaseOptions = {}
): void {
  const { strict = false } = options

  // Program or shader reference is null → report error
  if (!program || !shader) {
    handleError({
      subject : "shader",
      context : {
        action  : "detachShader",
        result  : "Program or shader reference is null"
      },
      strict  : strict
    })
    return
  }

  // Detach shader from program
  context.detachShader(program, shader)
}
