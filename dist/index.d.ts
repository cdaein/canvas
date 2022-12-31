/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 *
 * @param {object.<string,any>} opts - obtions object
 * @param {string | Element} opts.parent - parent string or element
 * @param {number} opts.width
 * @param {number} opts.height
 * @param {number} opts.pixelRatio - default: 1
 * @param {boolean} opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @returns object - { canvas, context, width, height }

 */
export declare const createCanvas: ({ parent, width, height, pixelRatio, scaleContext, }: {
    parent?: string | Element | undefined;
    width: number;
    height: number;
    pixelRatio?: number | undefined;
    scaleContext?: boolean | undefined;
}) => {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
};
/**
 * Resize canvas with given pixelRatio.
 *
 * @param opts - options object
 * @param opts.canvas - canvas to resize
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @param opts.scaleContext - default:true
 * @returns object - { canvas, context, width, height }
 */
export declare const resizeCanvas: ({ canvas, width, height, pixelRatio, scaleContext, }: {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    pixelRatio?: number | undefined;
    scaleContext?: boolean | undefined;
}) => {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
};
