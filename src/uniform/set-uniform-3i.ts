import {BaseOptions} from "../option";

export interface Uniform3iOptions extends BaseOptions {
  name: string
  x: number
  y: number
  z: number
  strict?: boolean
}

/**
 * Set a vec3 integer uniform in a WebGL shader program
 */
export function setUniform3i(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: Uniform3iOptions
): void {
  const { name, x, y, z, strict = false } = options

  const location = context.getUniformLocation(program, name)
  if (location === null) {
    if (strict) throw new Error(`Uniform "${name}" not found in shader program`)
    return
  }

  context.uniform3i(location, x, y, z)
}
