import { BaseOptions } from "../option"

/**
 * Configuration options for setting a sampler uniform
 */
export interface UniformSamplerOptions extends BaseOptions {
  /**
   * Uniform name in the shader (e.g. "uTexture")
   */
  name: string

  /**
   * Texture unit index (e.g. 0 for TEXTURE0)
   */
  unit: number
}

/**
 * Set a sampler uniform in a WebGL shader program
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Configuration object
 *    - `name` – Uniform name in the shader
 *    - `unit` – Texture unit index
 *    - `strict` – Throw error if uniform location is not found (default: false)
 *
 * **Usage**
 * ```ts
 * // Bind texture to unit 0 and assign sampler
 * context.activeTexture(context.TEXTURE0)
 * context.bindTexture(context.TEXTURE_2D, texture)
 *
 * setUniformSampler(context, program, {
 *   name: "uTexture",
 *   unit: 0
 * })
 *
 * // With strict mode enabled
 * setUniformSampler(context, program, {
 *   name: "uTexture",
 *   unit: 0,
 *   strict: true
 * })
 * ```
 */
export function setUniformSampler(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: UniformSamplerOptions
): void {
  const { name, unit, strict = false } = options

  const location = context.getUniformLocation(program, name)

  if (location === null) {
    if (strict) {
      throw new Error(`Uniform "${name}" not found in shader program`)
    }
    return
  }

  context.uniform1i(location, unit)
}
