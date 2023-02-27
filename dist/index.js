import { appendChild } from '@daeinc/dom';

// index.ts
var createCanvas = ({
  parent,
  context = "2d",
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes
}) => {
  const canvas = document.createElement("canvas");
  appendChild(parent, canvas);
  return resizeCanvas({
    canvas,
    context,
    width,
    height,
    pixelRatio,
    scaleContext,
    attributes
  });
};
var createOffscreenCanvas = ({
  context = "2d",
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes
}) => {
  const canvas = new OffscreenCanvas(width * pixelRatio, height * pixelRatio);
  return resizeCanvas({
    canvas,
    context,
    width,
    height,
    pixelRatio,
    scaleContext,
    attributes
  });
};
var resizeCanvas = ({
  canvas,
  context,
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes
}) => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  if (canvas instanceof HTMLCanvasElement) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }
  let ctx;
  let gl;
  if (context === "2d") {
    ctx = canvas.getContext("2d", attributes);
    if (!ctx)
      throw new Error("2d context cannot be created");
    if (scaleContext)
      ctx.scale(pixelRatio, pixelRatio);
  } else if (context === "webgl") {
    ctx = canvas.getContext("webgl", attributes);
    gl = ctx;
    if (!ctx)
      throw new Error("webgl context cannot be created");
    if (scaleContext) {
      gl.viewport(0, 0, width * pixelRatio, height * pixelRatio);
    } else {
      gl.viewport(0, 0, width, height);
    }
  } else if (context === "webgl2") {
    ctx = canvas.getContext("webgl2", attributes);
    gl = ctx;
    if (!ctx)
      throw new Error("webgl2 context cannot be created");
    if (scaleContext) {
      gl.viewport(0, 0, width * pixelRatio, height * pixelRatio);
    } else {
      gl.viewport(0, 0, width, height);
    }
  } else {
    throw new Error(`${context} is not supported`);
  }
  if (ctx) {
    return { canvas, context: ctx, gl, width, height };
  } else {
    throw new Error(`${context} context could not be created`);
  }
};
var setupCanvas = ({
  parent,
  canvas,
  width,
  height,
  pixelRatio = 1
}) => {
  if (pixelRatio <= 0)
    throw new Error("pixelRatio must be great than 0");
  appendChild(parent, canvas);
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  return { canvas, width, height, pixelRatio };
};

export { createCanvas, createOffscreenCanvas, resizeCanvas, setupCanvas };
