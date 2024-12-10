// TODO: separate createOffscreenCanvas()
// TODO: bitmaprenderer

import { appendChild } from "@daeinc/dom";
import type {
  CanvasReturn,
  Context,
  CtxAttributes,
  OffCanvasReturn,
} from "./types";

// re-export types
export type { Context } from "./types";

/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 * 
 * TODO: add pixelated option
 *
 * @param {object.<string,any>} opts - obtions object
 * @param opts.parent - parent string or element
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.pixelated - for 2d context
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns object - { canvas, context?, gl?, width, height }

 */
export const createCanvas = <Ctx extends Context>({
  parent,
  context,
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  parent?: string | Element | null;
  context?: Ctx;
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: Ctx extends "webgpu" ? undefined : boolean;
  attributes?: CtxAttributes<Ctx>;
}) => {
  const canvas = document.createElement("canvas");

  if (parent) {
    appendChild(parent, canvas);
  } else {
    canvas.style.display = `none`;
  }

  return resizeCanvas<Ctx>({
    canvas,
    context: context || "2d",
    width,
    height,
    pixelRatio,
    pixelated,
    scaleContext,
    attributes,
  }) as CanvasReturn<Ctx>;
};

/**
 * Resize canvas with given pixelRatio. In the current impl, there may be mismatch between the type generic Ctx and prop context:Context,
 * but this function is generally used internally to create a canvas.
 *
 * TODO: add pixelated option
 *
 * @param opts - options object
 * @param opts.canvas - canvas to resize
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @param opts.pixelated - for 2d context
 * @param opts.scaleContext - default:true
 * @param opts.attributes
 * @returns object - { canvas, context?, gl?, width, height }
 */
export const resizeCanvas = <Ctx extends Context>({
  canvas,
  context,
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  canvas: HTMLCanvasElement;
  context: Context;
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: boolean;
  attributes?: CtxAttributes<Ctx>;
}) => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  if (context === "2d") {
    const ctx = canvas.getContext("2d", attributes) as CanvasRenderingContext2D;
    if (!ctx) throw new Error(`Cannot get ${context} context`);
    if (pixelated) {
      canvas.style.imageRendering = "pixelated";
      ctx.imageSmoothingEnabled = false;
    }
    if (scaleContext) ctx.scale(pixelRatio, pixelRatio);
    return { canvas, context: ctx, width, height };
  } else if (context === "webgl" || context === "webgl2") {
    const gl = canvas.getContext(context, attributes) as
      | WebGLRenderingContext
      | WebGL2RenderingContext;
    if (!gl) throw new Error(`Cannot get ${context} context`);
    if (scaleContext) {
      gl.viewport(0, 0, width * pixelRatio, height * pixelRatio);
    } else {
      gl.viewport(0, 0, width, height);
    }
    return { canvas, gl, width, height };
  } else {
    const ctx = canvas.getContext("webgpu");
    if (!ctx) throw new Error(`Cannot get ${context} context`);
    // NOTE: `scaleContext` has no effect on webgpu canvas
    // I will need to find a way but it is not high priority.

    return { canvas, context: ctx, width, height };
  }
};

/**
 * create an OffscreenCanvas and context.
 *
 * NOT TESTED!!
 *
 * TODO: fulll implementation
 * TODO: add pixelated option (and test)
 *
 * @param opts.context
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.pixelated - for 2d context
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns
 */
export const createOffscreenCanvas = <Ctx extends Context>({
  context,
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  context: Ctx;
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: boolean;
  attributes?: CtxAttributes<Ctx>;
}) => {
  // REVIEW: offscreen canvas defines width and height at creation. is it necessary to do it again in resize?
  // keep in mind that there is no canvas.style
  const canvas = new OffscreenCanvas(width * pixelRatio, height * pixelRatio);

  return resizeOffscreenCanvas<Ctx>({
    canvas,
    context,
    width,
    height,
    pixelRatio,
    pixelated,
    scaleContext,
    attributes,
  }) as OffCanvasReturn<Ctx>;
};

/**
 * Resize offscreen canvas with given pixelRatio. In the current impl, there may be mismatch between the type generic Ctx and prop context:Context,
 * but this function is generally used internally to create a canvas.
 *
 * NOT TESTED!!
 *
 * TODO: add pixelated option
 *
 * @param opts - options object
 * @param opts.canvas - canvas to resize
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @param opts.pixelated - for 2d context
 * @param opts.scaleContext - default:true
 * @param opts.attributes
 * @returns object - { canvas, context?, gl?, width, height }
 */
export const resizeOffscreenCanvas = <Ctx extends Context>({
  canvas,
  context,
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  canvas: OffscreenCanvas;
  context: Context;
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: boolean;
  attributes?: CtxAttributes<Ctx>;
}) => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  if (context === "2d") {
    const ctx = canvas.getContext(
      "2d",
      attributes,
    ) as OffscreenCanvasRenderingContext2D;
    if (!ctx) throw new Error(`Cannot get ${ctx} context`);
    if (pixelated) {
      ctx.imageSmoothingEnabled = false;
    }
    if (scaleContext) ctx.scale(pixelRatio, pixelRatio);
    return { canvas, context: ctx, width, height };
  } else {
    const gl = canvas.getContext(context, attributes) as
      | WebGLRenderingContext
      | WebGL2RenderingContext;
    if (!gl) throw new Error(`Cannot get ${gl} context`);
    if (scaleContext) {
      gl.viewport(0, 0, width * pixelRatio, height * pixelRatio);
    } else {
      gl.viewport(0, 0, width, height);
    }
    return { canvas, gl, width, height };
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
