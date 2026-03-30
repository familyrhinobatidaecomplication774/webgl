/**
 * Create a new WebGL program object
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 *
 * **Usage**
 * ```ts
 * // Create program object
 * const program = createProgram(context)
 *
 * // Compile shaders
 * const vertexShader = compileShader(context, { source: vsSource, type: context.VERTEX_SHADER })
 * const fragmentShader = compileShader(context, { source: fsSource, type: context.FRAGMENT_SHADER })
 *
 * // Link shaders into program
 * linkProgram(context, program, {
 *   vertexShader,
 *   fragmentShader
 * })
 *
 * // Use the program
 * context.useProgram(program)
 * ```
 */
export function createProgram(context: WebGLRenderingContext): WebGLProgram {
  // Attempt to create a new program object
  const program = context.createProgram()

  // If creation failed, throw an error
  if (!program) throw new Error("Failed to create program")

  // Return the successfully created program
  return program
}
