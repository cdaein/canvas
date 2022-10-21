import type { Pt, Pts } from "@daeinc/geom";

/**
 *
 * @param ctx
 * @param pt [x, y]
 * @param diam diameter
 */
export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  pt: Pt,
  diam: number
) => {
  ctx.beginPath();
  ctx.arc(pt[0], pt[1], diam * 0.5, 0, Math.PI * 2);
};

/**
 * draw a 2d path. need to manually stroke/fill afterwards.
 * @param ctx canvas context 2d
 * @param path array of [ x, y ] point pairs
 * @param close close path or not. default is false
 */
export const drawPath = (
  ctx: CanvasRenderingContext2D,
  path: Pts,
  close: boolean = false
) => {
  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1]);
  if (close) ctx.closePath();
};

// TODO
// - respond to device pixel ratio
export const createCanvas = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas;
};
