import { parseSource } from "./parse-source"
import { parseContext } from "./parse-context"

/**
 * Context object for WebGL warnings
 */
export type WebGLWarningContext = {
  action: string
  result: string
  details?: string
  file?: string
  line?: number
  column?: number
}

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
 *    - `message` – Short description of the warning
 *    - `details` – Additional information (optional)
 *    - `file`    – Source file path (auto-extracted if available)
 *    - `line`    – Line number (auto-extracted if available)
 *    - `column`  – Column number (auto-extracted if available)
 *
 * **Usage**
 * ```ts
 * handleWarning("attribute", {
 *   action: "binding",
 *   message: "Attribute not found, skipped binding",
 *   details: "aColor missing in shader"
 * })
 * ```
 *
 * **Output**
 * ```
 * [attribute warning]
 * - action  : binding
 * - message : Attribute not found, skipped binding
 * - details : aColor missing in shader
 * - file    : /src/attribute.ts
 * - line    : 42
 * - column  : 13
 * ```
 */
export function handleWarning(
  subject: WebGLWarningType,
  context: WebGLWarningContext
): void {
  // Enrich context with file/line/column info
  Object.assign(context, parseSource())

  // Format structured warning message
  const message = parseContext(subject, "warning", context)

  // Log to console
  console.warn(message)
}