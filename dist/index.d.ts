import type { Pt, Pts } from "@daeinc/geom";
/**
 *
 * TODO
 * - respond to device pixel ratio
 * @param param0
 * @returns Canvas object
 */
export declare const createCanvas: ({ width, height, }: {
    width: number;
    height: number;
}) => HTMLCanvasElement;
/**
 * draw a circle with diameter
 * @param ctx
 * @param pt [x, y]
 * @param diam diameter
 */
export declare const drawCircle: (ctx: CanvasRenderingContext2D, pt: Pt, diam: number) => void;
/**
 *
 * @param ctx
 * @param msg
 * @param x
 * @param y
 */
export declare const drawFillText: (ctx: CanvasRenderingContext2D, msg: string, pt: Pt) => void;
/**
 * draw a line
 * @param ctx
 * @param pt1 [x, y]
 * @param pt2 [x, y]
 */
export declare const drawLine: (ctx: CanvasRenderingContext2D, pt1: Pt, pt2: Pt) => void;
/**
 * draw a 2d path. need to manually stroke/fill afterwards.
 * @param ctx canvas context 2d
 * @param path array of [ x, y ] point pairs
 * @param close close path or not. default is false
 */
export declare const drawPath: (ctx: CanvasRenderingContext2D, path: Pts, close?: boolean) => void;
//# sourceMappingURL=index.d.ts.map