import { appendChild } from '@daeinc/dom';

// index.ts
var createCanvas = ({
  parent,
  mode = "2d",
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes
}) => {
  if (pixelRatio <= 0)
    throw new Error("pixelRatio must be great than 0");
  const canvas = document.createElement("canvas");
  appendChild(parent, canvas);
  return resizeCanvas({
    canvas,
    mode,
    width,
    height,
    pixelRatio,
    scaleContext,
    attributes
  });
};
var resizeCanvas = ({
  canvas,
  mode,
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes
}) => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  let context;
  let gl;
  if (mode === "2d") {
    context = canvas.getContext("2d", attributes);
    if (!context)
      throw new Error("2d context cannot be created");
    if (scaleContext)
      context.scale(pixelRatio, pixelRatio);
  } else if (mode === "webgl") {
    context = canvas.getContext("webgl", attributes);
    gl = context;
    if (!context)
      throw new Error("webgl context cannot be created");
    if (scaleContext) {
      gl.viewport(0, 0, width * pixelRatio, height * pixelRatio);
    } else {
      gl.viewport(0, 0, width, height);
    }
  } else {
    throw new Error(`${mode} is not supported`);
  }
  if (context) {
    return { canvas, context, gl, width, height };
  } else {
    throw new Error(`${mode} context could not be created`);
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

export { createCanvas, resizeCanvas, setupCanvas };
