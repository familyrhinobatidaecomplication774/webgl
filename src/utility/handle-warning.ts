import { parseSource } from "./parse-source"
import { parseContext } from "./parse-context"

/**
 * Context object for WebGL warnings
 */
export type WebGLWarningContext = {
  /**
   * Operation being performed when the error occurred (e.g. "compilation", "linking", "binding")
   */
  action: string

  /**
   * Short description of the error outcome (e.g. "Failed to compile shader")
   */
  result: string

  /**
   * Additional information about the error (optional, e.g. GLSL compiler log or driver message)
   */
  details?: string

  /**
   * Source file path where the error originated (auto-extracted if available)
   */
  file?: string

  /**
   * Line number in the source file (auto-extracted if available)
   */
  line?: number

  /**
   * Column number in the source file (auto-extracted if available)
   */
  column?: number
}

/**
 * Enumerated subject types for WebGL warnings
 */
export type WebGLWarningType =
  | "webgl"
  | "shader"
  | "program"
  | "buffer"
  | "attribute"
  | "uniform"
  | "texture"
  | "canvas"

/**
 * Centralized warning handler for WebGL operations
 *
 * **Parameters**
 * - `subject` – Warning subject (`"shader" | "program" | "buffer" | "attribute" | "uniform" | "texture" | "canvas" | "webgl"`)
 * - `context` – Warning details object typed as `WebGLWarningContext`
 *    - `action`  – Operation being performed (e.g. "binding", "initialization")
 *    - `result`  – Short description of the warning
 *    - `details` – Additional information (optional)
 *    - `file`    – Source file path (auto-extracted if available)
 *    - `line`    – Line number (auto-extracted if available)
 *    - `column`  – Column number (auto-extracted if available)
 * - `strict`   – Whether to log warning (`true`) or skip silently (`false`, default)
 *
 * **Usage**
 * ```ts
 * // Silent mode: does nothing
 * handleWarning({
 *   subject: "attribute",
 *   context: {
 *     action: "binding",
 *     result: "Attribute not found, skipped binding",
 *     details: "aColor missing in shader"
 *   },
 *   strict: false
 * })
 *
 * // Strict mode: logs warning
 * handleWarning({
 *   subject: "attribute",
 *   context: {
 *     action: "binding",
 *     result: "Attribute not found, skipped binding",
 *     details: "aColor missing in shader"
 *   },
 *   strict: true
 * })
 * ```
 *
 * **Output**
 * ```
 * [attribute warning]
 * - action  : binding
 * - result  : Attribute not found, skipped binding
 * - details : aColor missing in shader
 * - file    : /src/attribute.ts
 * - line    : 42
 * - column  : 13
 * ```
 */
export function handleWarning({
  subject,
  context,
  strict = false
}: {
  subject: WebGLWarningType
  context: WebGLWarningContext
  strict?: boolean
}): void {
  // If strict is false → skip silently, do nothing
  if (!strict) return

  // Add file, line, and column info into the context object
  Object.assign(context, parseSource())

  // Build a structured warning message using subject and context
  const message = parseContext(subject, "warning", context)

  // Output the warning message to the console
  console.warn(message)
}
