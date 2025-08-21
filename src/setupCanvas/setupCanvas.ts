import { appendChild } from "@daeinc/dom";

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
