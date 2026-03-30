import { BaseOptions } from "../option"

export interface Uniform4fOptions extends BaseOptions {
  name: string
  x: number
  y: number
  z: number
  w: number
  strict?: boolean
}

/**
 * Set a vec4 uniform in a WebGL shader program
 */
export function setUniform4f(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform4fOptions
): void {
  const { name, x, y, z, w, strict = false } = options

  const location = context.getUniformLocation(program, name)
  if (location === null) {
    if (strict) throw new Error(`Uniform "${name}" not found in shader program`)
    return
  }

  context.uniform4f(location, x, y, z, w)
}
