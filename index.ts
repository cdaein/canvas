import { appendChild } from "@daeinc/dom";

/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 *
 * @param {object.<string,any>} opts - obtions object
 * @param opts.parent - parent string or element
 * @param opts.mode - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns object - { canvas, context, gl?, width, height }

 */
export const createCanvas = ({
  parent,
  mode = "2d",
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes,
}: {
  parent?: string | Element;
  mode?: "2d" | "webgl";
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
  attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes;
}) => {
  if (pixelRatio <= 0) throw new Error("pixelRatio must be great than 0");

  const canvas = document.createElement("canvas");

  // if parent
  appendChild(parent, canvas);

  // let canvasParentElement: Element;
  // if (parent !== undefined) {
  //   canvasParentElement = toDomElement(parent);
  //   canvasParentElement.appendChild(canvas);
  // } else {
  //   // if no parent, append to body
  //   document.body.appendChild(canvas);
  // }

  return resizeCanvas({
    canvas,
    mode,
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
 * TODO: add webgl2 context
 *
 * @param opts - options object
 * @param opts.canvas - canvas to resize
 * @param opts.mode - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @param opts.scaleContext - default:true
 * @param opts.attributes
 * @returns object - { canvas, context, gl?, width, height }
 */
export const resizeCanvas = ({
  canvas,
  mode,
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
  attributes,
}: {
  canvas: HTMLCanvasElement;
  mode: "2d" | "webgl";
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
  attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes;
}): {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | WebGLRenderingContext;
  gl?: WebGLRenderingContext;
  width: number;
  height: number;
} => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  let context: CanvasRenderingContext2D | WebGLRenderingContext | null;
  let gl;

  if (mode === "2d") {
    // 2d
    context = canvas.getContext("2d", attributes) as CanvasRenderingContext2D;
    if (!context) throw new Error("2d context cannot be created");
    if (scaleContext) context.scale(pixelRatio, pixelRatio);
  } else if (mode === "webgl") {
    // webgl
    context = canvas.getContext("webgl", attributes) as WebGLRenderingContext;
    gl = context;
    if (!context) throw new Error("webgl context cannot be created");
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
