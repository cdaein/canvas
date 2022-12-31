import { toDomElement } from "@daeinc/dom";

type CanvasData = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
};

/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 *
 * @param {object.<string,any>} opts - obtions object
 * @param {string | Element} opts.parent - parent string or element
 * @param {number} opts.width
 * @param {number} opts.height
 * @param {number} opts.pixelRatio - default: 1
 * @param {boolean} opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @returns {CanvasData} object - canvas, context, width, height

 */
export const createCanvas = ({
  parent,
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
}: {
  parent?: string | Element;
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
}): CanvasData => {
  if (pixelRatio <= 0) throw new Error("pixelRatio must be great than 0");

  let canvas = document.createElement("canvas");

  // if parent
  let canvasParentElement: Element;
  if (parent !== undefined) {
    canvasParentElement = toDomElement(parent);
    canvasParentElement.appendChild(canvas);
  } else {
    // if no parent, append to body
    document.body.appendChild(canvas);
  }

  return resizeCanvas({
    canvas,
    width,
    height,
    pixelRatio,
    scaleContext,
  });
};

/**
 * Resize canvas with given pixelRatio.
 *
 * @param opts - options object
 * @param opts.canvas - canvas to resize
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @param opts.scaleContext - default:true
 * @returns {CanvasData} object - canvas, context, width, height
 */
export const resizeCanvas = ({
  canvas,
  width,
  height,
  pixelRatio = 1,
  scaleContext = true,
}: {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
}): CanvasData => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d")!;
  if (scaleContext) context.scale(pixelRatio, pixelRatio);

  return { canvas, context, width, height };
};
