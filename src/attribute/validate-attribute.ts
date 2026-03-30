import type { BaseOptions } from "../option"
import { handleError } from "../error"

/**
 * Configuration options for validating a vertex attribute
 */
export interface ValidateAttributeOptions extends BaseOptions {
  /**
   * Attribute name in the shader (e.g. "aPosition")
   */
  name: string
}

/**
 * Validate a vertex attribute by checking its location
 *
 * **Parameters**
 * - `context` – Target WebGL rendering context (WebGL1 or WebGL2)
 * - `program` – Linked shader program
 * - `options` – Validation configuration
 *    - `name` – Attribute name in the shader
 *    - `strict` – Throw error if attribute is not found (optional, default: false)
 *
 * **Usage**
 * ```ts
 * // Validate attribute existence
 * const location = validateAttribute(context, program, { name: "aPosition" })
 *
 * // Enforce strict mode
 * const location = validateAttribute(context, program, {
 *   name: "aPosition",
 *   strict: true
 * })
 * ```
 */
export function validateAttribute(
  context: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  options: ValidateAttributeOptions
): number {
  // Extract attribute name and strict mode flag from options
  const { name, strict = false } = options

  // Query the attribute location from the linked shader program
  const location = context.getAttribLocation(program, name)

  // If the attribute is not found (-1 means missing)
  if (location === -1) {
    // Delegate error handling to centralized handler
    // - Throws AttributeError if strict = true
    // - Does nothing if strict = false
    handleError({
      subject : "attribute",
      context : {
        action : "validation",
        result : `Attribute "${name}" not found in shader program`
      },
      strict  : strict,
    })
  }

  // Return the location (either valid index or -1 if not found)
  return location
}
