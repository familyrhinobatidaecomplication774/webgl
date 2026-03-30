/**
 * Parse file, line, and column information from the current stack trace
 */
export function parseSource(): {
  file: string
  line: number
  column: number
} {
  // Capture the third line of the stack trace (where the caller is located)
  const stack = new Error().stack?.split("\n")[2] || ""

  // Regex patterns to match different runtime environments
  const patterns = [
    /\((.*):(\d+):(\d+)\)/,   // Node.js / Chrome with function name
    /at (.*):(\d+):(\d+)/,    // Chrome without parentheses
    /(.*):(\d+):(\d+)/        // Firefox / Safari
  ]

  // Try each regex pattern until one matches
  for (const pattern of patterns) {
    const match = stack.match(pattern)
    if (match) {
      const [, file, line, column] = match
      return {
        file: file ?? "unknown", // fallback to "unknown" if file is missing
        line: line ? Number(line) : -1, // convert line to number or -1 if missing
        column: column ? Number(column) : -1 // convert column to number or -1 if missing
      }
    }
  }

  // Fallback if no regex matches → return unknown values
  return {
    file: "unknown",
    line: -1,
    column: -1
  }
}
