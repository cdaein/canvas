import { appendChild } from "@daeinc/dom";

/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 *
 * @param {object.<string,any>} opts - obtions object
 * @param opts.parent - parent string or element
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns object - { canvas, context, gl?, width, height }

 */
export const createCanvas = ({
  parent,
  context = "2d",
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes,
}: {
  parent?: string | Element;
  context?: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
  attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes;
}) => {
  // if (pixelRatio <= 0) throw new Error("pixelRatio must be great than 0");

  const canvas = document.createElement("canvas");

  // if parent
  appendChild(parent, canvas);

  return resizeCanvas({
    canvas,
    context,
    width,
    height,
    pixelRatio,
    scaleContext,
    attributes,
  });
};

/**
 * Resize canvas with given pixelRatio.
 *
 * @param opts - options object
 * @param opts.canvas - canvas to resize
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @param opts.scaleContext - default:true
 * @param opts.attributes
 * @returns object - { canvas, context, gl?, width, height }
 */
export const resizeCanvas = ({
  canvas,
  context,
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes,
}: {
  canvas: HTMLCanvasElement;
  context: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
  attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes;
}): {
  canvas: HTMLCanvasElement;
  context:
    | CanvasRenderingContext2D
    | WebGLRenderingContext
    | WebGL2RenderingContext;
  gl?: WebGLRenderingContext | WebGL2RenderingContext;
  width: number;
  height: number;
} => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  let ctx:
    | CanvasRenderingContext2D
    | WebGLRenderingContext
    | WebGL2RenderingContext
    | null;
  let gl;

  if (context === "2d") {
    // 2d
    ctx = canvas.getContext("2d", attributes) as CanvasRenderingContext2D;
    if (!ctx) throw new Error("2d context cannot be created");
    if (scaleContext) ctx.scale(pixelRatio, pixelRatio);
  } else if (context === "webgl") {
    // webgl
    ctx = canvas.getContext("webgl", attributes) as WebGLRenderingContext;
    gl = ctx;
    if (!ctx) throw new Error("webgl context cannot be created");
    if (scaleContext) {
      gl.viewport(0, 0, width * pixelRatio, height * pixelRatio);
    } else {
      gl.viewport(0, 0, width, height);
    }
  } else if (context === "webgl2") {
    // webgl2
    ctx = canvas.getContext("webgl2", attributes) as WebGL2RenderingContext;
    gl = ctx;
    if (!ctx) throw new Error("webgl2 context cannot be created");
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

/**
 * use existing canvas and set it up. (add to parent if any, set up size for canvas and canvas.style)
 * it does not call getContext() to make it easy to use with other libraries that have their own context setup.
 *
 * @param opts - options object
 * @param opts.parent - parent string or Element
 * @param opts.canvas - canvas to set up
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @returns object - { canvas, width, height, pixelRatio }
 */
export const setupCanvas = ({
  parent,
  canvas,
  width,
  height,
  pixelRatio = 1,
}: {
  parent?: string | Element;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio?: number;
}): {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio: number;
} => {
  if (pixelRatio <= 0) throw new Error("pixelRatio must be great than 0");

  // if parent
  appendChild(parent, canvas);

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  return { canvas, width, height, pixelRatio };
};
