/**
 * Configuration options for binding a vertex attribute
 */
export interface BindAttributeOptions {
  /** Attribute name in the shader (e.g. "aPosition") */
  name: string

  /** Number of components per vertex (e.g. 2 for vec2, 3 for vec3) */
  size: number

  /** Data type (e.g. `context.FLOAT`) */
  type: number

  /** Byte offset between consecutive attributes (default: 0) */
  stride?: number

  /** Byte offset of the first component (default: 0) */
  offset?: number
}

/**
 * Enable and bind a vertex attribute to a buffer
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `options` – Attribute binding configuration
 *    - `name` – Attribute name in the shader
 *    - `size` – Number of components per vertex
 *    - `type` – Data type
 *    - `stride` – Byte stride (optional)
 *    - `offset` – Byte offset (optional)
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // attribute vec2 aPosition;
 *
 * // Create a quad vertex buffer
 * const vbo = createQuadBuffer(context, positionLocation)
 *
 * // Bind the buffer to the "aPosition" attribute in the shader
 * bindAttribute(context, program, {
 *   name: "aPosition",
 *   size: 2,
 *   type: context.FLOAT
 * })
 *
 * // Now you can draw using the bound attribute
 * context.drawArrays(context.TRIANGLE_STRIP, 0, 4)
 * ```
 */
export function bindAttribute(
  context: WebGLRenderingContext,
  program: WebGLProgram,
  options: BindAttributeOptions
): void {
  const {
    name,
    size,
    type,
    stride = 0,
    offset = 0
  } = options

  const location = context.getAttribLocation(program, name)
  if (location === -1) {
    throw new Error(`Attribute "${name}" not found in shader program`)
  }

  context.enableVertexAttribArray(location)
  context.vertexAttribPointer(location, size, type, false, stride, offset)
}

/**
 * Enable a vertex attribute
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Attribute name in the shader (e.g. "aPosition")
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // attribute vec3 aPosition;
 *
 * // Enable the "aPosition" attribute
 * enableAttribute(context, program, "aPosition")
 *
 * // After enabling, you can bind a buffer and set pointer
 * context.bindBuffer(context.ARRAY_BUFFER, vbo)
 * context.vertexAttribPointer(location, 3, context.FLOAT, false, 0, 0)
 * ```
 */
export function enableAttribute(
  context: WebGLRenderingContext,
  program: WebGLProgram,
  name: string
): void {
  const location = context.getAttribLocation(program, name)
  if (location === -1) {
    throw new Error(`Attribute "${name}" not found in shader program`)
  }
  context.enableVertexAttribArray(location)
}

/**
 * Disable a vertex attribute
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context
 * - `program` – Linked shader program
 * - `name` – Attribute name in the shader
 *
 * **Usage**
 * ```ts
 * // Vertex shader example:
 * // attribute vec2 aTexCoord;
 *
 * // Disable the "aTexCoord" attribute when it's not needed
 * disableAttribute(context, program, "aTexCoord")
 *
 * // This prevents unnecessary GPU work for unused attributes
 * ```
 */
export function disableAttribute(
  context: WebGLRenderingContext,
  program: WebGLProgram,
  name: string
): void {
  const location = context.getAttribLocation(program, name)
  if (location !== -1) {
    context.disableVertexAttribArray(location)
  }
}
