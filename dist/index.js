"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawSmoothPath = exports.drawPath = exports.drawLine = exports.drawFillText = exports.drawCircle = exports.createCanvas = void 0;
/**
 *
 * TODO
 * - respond to device pixel ratio
 * @param param0
 * @returns Canvas object
 */
const createCanvas = ({ width, height, }) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
};
exports.createCanvas = createCanvas;
/**
 * draw a circle with diameter
 * @param ctx
 * @param pt [x, y]
 * @param diam diameter
 */
const drawCircle = (ctx, pt, diam) => {
    ctx.beginPath();
    ctx.arc(pt[0], pt[1], diam * 0.5, 0, Math.PI * 2);
};
exports.drawCircle = drawCircle;
/**
 *
 * @param ctx
 * @param msg
 * @param x
 * @param y
 */
const drawFillText = (ctx, msg, pt
// options?: { font: string }
) => {
    // ctx.font = options?.font ? (ctx.font = options.font) : "8px Helvetica";
    ctx.fillText(msg, pt[0], pt[1]);
};
exports.drawFillText = drawFillText;
/**
 * draw a line
 * @param ctx
 * @param pt1 [x, y]
 * @param pt2 [x, y]
 */
const drawLine = (ctx, pt1, pt2) => {
    ctx.beginPath();
    ctx.moveTo(pt1[0], pt1[1]);
    ctx.lineTo(pt2[0], pt2[1]);
};
exports.drawLine = drawLine;
/**
 * draw a 2d path. need to manually stroke/fill afterwards.
 * @param ctx canvas context 2d
 * @param path array of [ x, y ] point pairs
 * @param close close path or not. default is false
 */
const drawPath = (ctx, path, close = false) => {
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++)
        ctx.lineTo(path[i][0], path[i][1]);
    if (close)
        ctx.closePath();
};
exports.drawPath = drawPath;
/**
 * use quadratic curve to smoothen hard edges of path. use with geom.generateSmoothPath()
 * @param ctx
 * @param path array of [ x, y ]
 */
const drawSmoothPath = (ctx, path) => {
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    ctx.lineTo(path[1][0], path[1][1]);
    ctx.lineTo(path[2][0], path[2][1]);
    for (let i = 3; i < path.length - 3; i += 3) {
        ctx.quadraticCurveTo(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
        ctx.lineTo(path[i + 2][0], path[i + 2][1]);
    }
    const lastPt = path[path.length - 1];
    ctx.lineTo(lastPt[0], lastPt[1]);
};
exports.drawSmoothPath = drawSmoothPath;
//# sourceMappingURL=index.js.map