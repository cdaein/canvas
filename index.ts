import { toDomElement } from "@daeinc/dom";

/**
 * create a new canvas element and attach to document
 * @param {object} param - object
 * @param {string | Element} param.parent - parent string or element
 * @param {number} param.width
 * @param {number} param.height
 * @param {number} param.pixelRatio
 * @returns Canvas object
 */
export const createCanvas = ({
  parent,
  width,
  height,
  pixelRatio = 1,
}: {
  parent?: string | Element;
  width: number;
  height: number;
  pixelRatio?: number;
}) => {
  // if canvas doesn't already exist
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

  canvas = resizeCanvas({ canvas, width, height, pixelRatio });

  return canvas;
};

/**
 * resize canvas with given pixelRatio.
 * @param {object} param - object
 * @param {HTMLCanvasElement} param.canvas - canvas to resize
 * @param {number} param.width
 * @param {number} param.height
 * @param {number} param.pixelRatio
 */
export const resizeCanvas = ({
  canvas,
  width,
  height,
  pixelRatio,
}: {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio: number;
}) => {
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  return canvas;
};
