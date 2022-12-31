"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeCanvas = exports.createCanvas = void 0;
const dom_1 = require("@daeinc/dom");
/**
 * create a new canvas element and attach to document
 * @param {object} param - object
 * @param {string | Element} param.parent - parent string or element
 * @param {number} param.width
 * @param {number} param.height
 * @param {number} param.pixelRatio
 * @returns Canvas object
 */
const createCanvas = ({ parent, width, height, pixelRatio = 1, }) => {
    // if canvas doesn't already exist
    let canvas = document.createElement("canvas");
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
    canvas = (0, exports.resizeCanvas)({ canvas, width, height, pixelRatio });
    return canvas;
};
exports.createCanvas = createCanvas;
/**
 * resize canvas with given pixelRatio.
 * @param {object} param - object
 * @param {HTMLCanvasElement} param.canvas - canvas to resize
 * @param {number} param.width
 * @param {number} param.height
 * @param {number} param.pixelRatio
 */
const resizeCanvas = ({ canvas, width, height, pixelRatio, }) => {
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    return canvas;
};
exports.resizeCanvas = resizeCanvas;
