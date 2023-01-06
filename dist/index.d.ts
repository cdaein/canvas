/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 *
 * @param {object.<string,any>} opts - obtions object
 * @param opts.parent - parent string or element
 * @param opts.mode - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns object - { canvas, context, gl?, width, height }

 */
declare const createCanvas: ({ parent, mode, width, height, pixelRatio, scaleContext, attributes, }: {
    parent?: string | Element | undefined;
    mode?: "2d" | "webgl" | undefined;
    width: number;
    height: number;
    pixelRatio?: number | undefined;
    scaleContext?: boolean | undefined;
    attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes | undefined;
}) => {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | WebGLRenderingContext;
    gl?: WebGLRenderingContext | undefined;
    width: number;
    height: number;
};
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
declare const resizeCanvas: ({ canvas, mode, width, height, pixelRatio, scaleContext, attributes, }: {
    canvas: HTMLCanvasElement;
    mode: "2d" | "webgl";
    width: number;
    height: number;
    pixelRatio?: number | undefined;
    scaleContext?: boolean | undefined;
    attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes | undefined;
}) => {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | WebGLRenderingContext;
    gl?: WebGLRenderingContext | undefined;
    width: number;
    height: number;
};
/**
 * use existing canvas and set it up. (add to parent if any, set up size for canvas and canvas.style)
 * it does not call getContext() to make it easy to use with other libraries that have their own context setup.
 *
 * @param opts - options object
 * @param opts.parent - parent string or Element
 * @param opts.canvas - canvas to set up
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @returns object - { canvas, width, height, pixelRatio }
 */
declare const setupCanvas: ({ parent, canvas, width, height, pixelRatio, }: {
    parent?: string | Element | undefined;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    pixelRatio?: number | undefined;
}) => {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    pixelRatio: number;
};

export { createCanvas, resizeCanvas, setupCanvas };
