import { Context, CtxAttributes } from "../types";

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
