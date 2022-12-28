import type { Pt, Pts } from "@daeinc/geom";
/**
 * create a new canvas element and attach to document
 * @param {object} param - object
 * @param {string | HTMLElement} param.parent - parent string or element
 * @param {number} param.width
 * @param {number} param.height
 * @param {number} param.pixelRatio
 * @returns Canvas object
 */
export declare const createCanvas: ({ parent, width, height, pixelRatio, }: {
    parent?: string | HTMLElement | undefined;
    width: number;
    height: number;
    pixelRatio?: number | undefined;
}) => HTMLCanvasElement;
/**
 * resize canvas with given pixelRatio.
 * @param {object} param - object
 * @param {HTMLCanvasElement} param.canvas - canvas to resize
 * @param {number} param.width
 * @param {number} param.height
 * @param {number} param.pixelRatio
 */
export declare const resizeCanvas: ({ canvas, width, height, pixelRatio, }: {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    pixelRatio: number;
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
/**
 * draw a rectangle
 * @param pt [ x, y ]
 * @param size [ width, height ]
 * @param mode "corner" or "center"
 */
export declare const drawRect: (ctx: CanvasRenderingContext2D, pt: Pt, size: Pt, mode?: "corner" | "center") => void;
/**
 * use quadratic curve to smoothen hard edges of path. use with geom.generateSmoothPath()
 * @param ctx
 * @param path array of [ x, y ]
 */
export declare const drawSmoothPath: (ctx: CanvasRenderingContext2D, path: Pts) => void;
//# sourceMappingURL=index.d.ts.map