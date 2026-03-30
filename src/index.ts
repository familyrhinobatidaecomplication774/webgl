// Attribute
export { bindAttribute, type BindAttributeOptions } from "./attribute/bind-attribute"
export { disableAttribute, type DisableAttributeOptions } from "./attribute/disable-attribute"
export { enableAttribute, type EnableAttributeOptions } from "./attribute/enable-attribute"
export { validateAttribute, type ValidateAttributeOptions } from "./attribute/validate-attribute"

// Buffer
export { createBuffer, type BufferOptions } from "./buffer/create-buffer"
export { createCubeBuffer } from "./buffer/create-cube-buffer"
export { createCubeIndexBuffer } from "./buffer/create-cube-index-buffer"
export { createQuadBuffer } from "./buffer/create-quad-buffer"
export { createQuadIndexBuffer } from "./buffer/create-quad-index-buffer"
export { createTriangleBuffer } from "./buffer/create-triangle-buffer"
export { createTriangleIndexBuffer } from "./buffer/create-triangle-index-buffer"
export { deleteBuffer } from "./buffer/delete-buffer"
export { updateBuffer } from "./buffer/update-buffer"
export { updateBufferPartial } from "./buffer/update-buffer-partial"

// Canvas
export { resizeCanvas, type ResizeCanvasOptions } from "./canvas/resize-canvas"

// Context
export { canvasContext, type CanvasContextOptions } from "./context/canvas-context"

// Uniform
export {
  setUniform1,
  setUniform2,
  setUniform3,
  setUniform4,
  setUniformSampler,
  setUniformBlock,
  setUniformBuffer,
  setUniformMatrix,
  setUniformUi,
  type Uniform1Options,
  type Uniform2Options,
  type Uniform3Options,
  type Uniform4Options,
  type UniformSamplerOptions,
  type UniformBlockOptions,
  type UniformMatrixOptions,
  type UniformBufferOptions,
  type UniformUiOptions
} from "./uniform"

// Shader
export {
  attachShader,
  compileShader,
  createShader,
  deleteShader,
  detachShader,
  validateShader,
  type CompileShaderOptions,
  type CreateShaderOptions
} from "./shader"
