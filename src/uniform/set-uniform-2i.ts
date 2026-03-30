import { BaseOptions } from "../option"

export interface Uniform2iOptions extends BaseOptions {
  name: string
  x: number
  y: number
  strict?: boolean
}

/**
 * Set a vec2 integer uniform in a WebGL shader program
 */
export function setUniform2i(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform2iOptions
): void {
  const { name, x, y, strict = false } = options

  const location = context.getUniformLocation(program, name)
  if (location === null) {
    if (strict) throw new Error(`Uniform "${name}" not found in shader program`)
    return
  }

  context.uniform2i(location, x, y)
}
