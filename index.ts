import { appendChild } from "@daeinc/dom";

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
 * @param opts.offscreen - still uses a regular HTMLCanvasElement but will not attach to document.
 * @returns object - { canvas, context, gl?, width, height }

 */
export const createCanvas = ({
  parent,
  context = "2d",
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
  offscreen = false,
}: {
  parent?: string | Element;
  context?: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: boolean;
  attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes;
  offscreen?: boolean;
}) => {
  const canvas = document.createElement("canvas");

  if (!offscreen) {
    appendChild(parent, canvas);
  } else {
    canvas.style.display = `none`;
  }

  return resizeCanvas({
    canvas,
    context,
    width,
    height,
    pixelRatio,
    pixelated,
    scaleContext,
    attributes,
  }) as {
    canvas: HTMLCanvasElement;
    context:
      | CanvasRenderingContext2D
      | WebGLRenderingContext
      | WebGL2RenderingContext;
    gl?: WebGLRenderingContext | WebGL2RenderingContext;
    width: number;
    height: number;
  };
};

/**
 * create an OffscreenCanvas and context.
 *
 * TODO: support bitmaprenderer
 *       add pixelated option (and test)
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
export const createOffscreenCanvas = ({
  context = "2d",
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  context: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: boolean;
  attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes;
}) => {
  const canvas = new OffscreenCanvas(width * pixelRatio, height * pixelRatio);

  return resizeCanvas({
    canvas,
    context,
    width,
    height,
    pixelRatio,
    pixelated,
    scaleContext,
    attributes,
  }) as {
    canvas: OffscreenCanvas;
    context:
      | OffscreenCanvasRenderingContext2D
      | WebGLRenderingContext
      | WebGL2RenderingContext;
    gl?: WebGLRenderingContext | WebGL2RenderingContext;
    width: number;
    height: number;
  };
};

//

/**
 * Resize canvas with given pixelRatio.
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
 * @returns object - { canvas, context, gl?, width, height }
 */
export const resizeCanvas = ({
  canvas,
  context,
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  canvas: HTMLCanvasElement | OffscreenCanvas;
  context: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: boolean;
  attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes;
}): {
  canvas: HTMLCanvasElement | OffscreenCanvas;
  context:
    | CanvasRenderingContext2D
    | WebGLRenderingContext
    | WebGL2RenderingContext
    | OffscreenCanvasRenderingContext2D;
  gl?: WebGLRenderingContext | WebGL2RenderingContext;
  width: number;
  height: number;
} => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  if (canvas instanceof HTMLCanvasElement) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  let ctx:
    | CanvasRenderingContext2D
    | WebGLRenderingContext
    | WebGL2RenderingContext
    | OffscreenCanvasRenderingContext2D
    | null;
  let gl;

  if (context === "2d") {
    // 2d
    if (canvas instanceof HTMLCanvasElement) {
      ctx = canvas.getContext("2d", attributes) as CanvasRenderingContext2D;

      if (pixelated) {
        canvas.style.imageRendering = "pixelated";
        ctx.imageSmoothingEnabled = false;
      }
    } else {
      // offscreen context
      ctx = canvas.getContext(
        "2d",
        attributes
      ) as OffscreenCanvasRenderingContext2D;

      if (pixelated) {
        ctx.imageSmoothingEnabled = false;
      }
    }
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
