import type { BaseOptions } from "../option"
import { handleError } from "../utility/handle-error"

/**
 * Attach a compiled shader to a WebGL program
 *
 * **Parameters**
 * - `context` – WebGL rendering context (WebGL1 or WebGL2)
 * - `program` – Target WebGL program
 * - `shader` – Compiled shader to attach
 * - `options` – Optional configuration
 *    - `strict` – Throw error if shader or program is null (default: false)
 *
 * **Usage**
 * ```ts
 * // Attach a vertex shader to a program
 * attachShader(context, program, vertexShader)
 *
 * // Attach a fragment shader with strict mode enabled
 * attachShader(context, program, fragmentShader, { strict: true })
 *
 * // Safe usage: check compile result before attaching
 * const shader = compileShader(context, { source: vsSource, type: context.VERTEX_SHADER })
 * if (shader) {
 *   attachShader(context, program, shader)
 * }
 * ```
 */
export function attachShader(
  context: WebGLRenderingContext | WebGL2RenderingContext,
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
        action  : "attachShader",
        result  : "Program or shader reference is null"
      },
      strict  : strict
    })
    return
  }

  // Attach shader to program
  context.attachShader(program, shader)
}
