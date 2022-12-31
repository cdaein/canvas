/**
 * create a new canvas element and attach to document
 * @param {object} param - object
 * @param {string | Element} param.parent - parent string or element
 * @param {number} param.width
 * @param {number} param.height
 * @param {number} param.pixelRatio
 * @returns Canvas object
 */
export declare const createCanvas: ({ parent, width, height, pixelRatio, }: {
    parent?: string | Element | undefined;
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
