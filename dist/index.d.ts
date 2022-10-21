import type { Pt, Pts } from "@daeinc/geom";
/**
 *
 * @param ctx
 * @param pt [x, y]
 * @param diam diameter
 */
export declare const drawCircle: (ctx: CanvasRenderingContext2D, pt: Pt, diam: number) => void;
/**
 * draw a 2d path. need to manually stroke/fill afterwards.
 * @param ctx canvas context 2d
 * @param path array of [ x, y ] point pairs
 * @param close close path or not. default is false
 */
export declare const drawPath: (ctx: CanvasRenderingContext2D, path: Pts, close?: boolean) => void;
export declare const createCanvas: ({ width, height, }: {
    width: number;
    height: number;
}) => HTMLCanvasElement;
//# sourceMappingURL=index.d.ts.map