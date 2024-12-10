/// <reference types="@webgpu/types" />

import { createCanvas, resizeCanvas } from "../index";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

const { canvas, context, width, height } = createCanvas({
  parent: "body",
  context: "webgpu",
  width: 500,
  height: 500,
  pixelRatio: window.devicePixelRatio,
  // scaleContext: false,
});

console.log({ width, height });
console.log({ "canvas width": canvas.width, "canvas height": canvas.height });

if (!navigator.gpu) {
  throw new Error("WebGPU not supported on this browser.");
}
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw new Error("No appropriate GPUAdapter found.");
}
const device = await adapter.requestDevice()!;
const canvasFormat = navigator.gpu.getPreferredCanvasFormat();

context.configure({
  device,
  format: canvasFormat,
});

const shaders = `
@vertex
fn v_main(
  @builtin(vertex_index) VertexIndex : u32
) -> @builtin(position) vec4f {
  var pos = array<vec2f, 3>(
    vec2(0.0, 0.8),
    vec2(-0.5, -0.8),
    vec2(0.5, -0.8)
  );

  return vec4f(pos[VertexIndex], 0.0, 1.0);
}

@fragment
fn f_main() -> @location(0) vec4f {
  return vec4(0.0, 0.0, 1.0, 1.0);
}
`;
const shaderModule = device.createShaderModule({
  code: shaders,
});

const encoder = device.createCommandEncoder();
const textureView = context.getCurrentTexture().createView();

const renderPassDescriptor: GPURenderPassDescriptor = {
  colorAttachments: [
    {
      view: textureView,
      clearValue: [1.0, 1.0, 1.0, 0],
      loadOp: "clear",
      storeOp: "store",
    },
  ],
};

const pipeline = device.createRenderPipeline({
  vertex: {
    module: shaderModule,
    entryPoint: "v_main",
  },
  fragment: {
    module: shaderModule,
    entryPoint: "f_main",
    targets: [
      {
        format: canvasFormat,
      },
    ],
  },
  primitive: {
    topology: "triangle-list",
  },
  layout: "auto",
});

const pass = encoder.beginRenderPass(renderPassDescriptor);
pass.setPipeline(pipeline);
pass.draw(3);
pass.end();

device.queue.submit([encoder.finish()]);
