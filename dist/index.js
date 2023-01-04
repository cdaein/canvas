"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeCanvas = exports.createCanvas = void 0;
const dom_1 = require("@daeinc/dom");
/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 *
 * @param {object.<string,any>} opts - obtions object
 * @param {string | Element} opts.parent - parent string or element
 * @param {"2d" | "webgl"} opts.mode - which context to use
 * @param {number} opts.width
 * @param {number} opts.height
 * @param {number} opts.pixelRatio - default: 1
 * @param {boolean} opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @returns object - { canvas, context, gl?, width, height }

 */
const createCanvas = ({ parent, mode = "2d", width, height, pixelRatio = 1, scaleContext = true, }) => {
    if (pixelRatio <= 0)
        throw new Error("pixelRatio must be great than 0");
    const canvas = document.createElement("canvas");
    // if parent
    let canvasParentElement;
    if (parent !== undefined) {
        canvasParentElement = (0, dom_1.toDomElement)(parent);
        canvasParentElement.appendChild(canvas);
    }
    else {
        // if no parent, append to body
        document.body.appendChild(canvas);
    }
    return (0, exports.resizeCanvas)({
        canvas,
        mode,
        width,
        height,
        pixelRatio,
        scaleContext,
    });
};
exports.createCanvas = createCanvas;
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
 * @returns object - { canvas, context, gl?, width, height }
 */
const resizeCanvas = ({ canvas, mode, width, height, pixelRatio = 1, scaleContext = true, }) => {
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    let context;
    let gl;
    if (mode === "2d") {
        // 2d
        context = canvas.getContext("2d");
        if (!context)
            throw new Error("2d context cannot be created");
        if (scaleContext)
            context.scale(pixelRatio, pixelRatio);
    }
    else {
        // webgl
        context = canvas.getContext("webgl");
        gl = context;
        if (!context)
            throw new Error("webgl context cannot be created");
        if (scaleContext) {
            gl.viewport(0, 0, width * pixelRatio, height * pixelRatio);
        }
        else {
            gl.viewport(0, 0, width, height);
        }
    }
    if (context) {
        return { canvas, context, gl, width, height };
    }
    else {
        throw new Error(`${mode} context could not be created`);
    }
};
exports.resizeCanvas = resizeCanvas;
