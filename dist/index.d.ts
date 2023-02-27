/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 *
 * @param {object.<string,any>} opts - obtions object
 * @param opts.parent - parent string or element
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns object - { canvas, context, gl?, width, height }

 */
declare const createCanvas: ({ parent, context, width, height, pixelRatio, scaleContext, attributes, }: {
    parent?: string | Element | undefined;
    context?: "2d" | "webgl" | "webgl2" | undefined;
    width: number;
    height: number;
    pixelRatio?: number | undefined;
    scaleContext?: boolean | undefined;
    attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes | undefined;
}) => {
    canvas: HTMLCanvasElement | OffscreenCanvas;
    context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
    gl?: WebGLRenderingContext | WebGL2RenderingContext | undefined;
    width: number;
    height: number;
};
/**
 *
 * @param opts.context
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns
 */
declare const createOffscreenCanvas: ({ context, width, height, pixelRatio, scaleContext, attributes, }: {
    context: "2d" | "webgl" | "webgl2" | "bitmaprenderer";
    width: number;
    height: number;
    pixelRatio?: number | undefined;
    scaleContext?: boolean | undefined;
    attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes | undefined;
}) => {
    canvas: HTMLCanvasElement | OffscreenCanvas;
    context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
    gl?: WebGLRenderingContext | WebGL2RenderingContext | undefined;
    width: number;
    height: number;
};
/**
 * Resize canvas with given pixelRatio.
 *
 * @param opts - options object
 * @param opts.canvas - canvas to resize
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default:1
 * @param opts.scaleContext - default:true
 * @param opts.attributes
 * @returns object - { canvas, context, gl?, width, height }
 */
declare const resizeCanvas: ({ canvas, context, width, height, pixelRatio, scaleContext, attributes, }: {
    canvas: HTMLCanvasElement | OffscreenCanvas;
    context: "2d" | "webgl" | "webgl2" | "bitmaprenderer";
    width: number;
    height: number;
    pixelRatio?: number | undefined;
    scaleContext?: boolean | undefined;
    attributes?: CanvasRenderingContext2DSettings | WebGLContextAttributes | undefined;
}) => {
    canvas: HTMLCanvasElement | OffscreenCanvas;
    context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
    gl?: WebGLRenderingContext | WebGL2RenderingContext | undefined;
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

export { createCanvas, createOffscreenCanvas, resizeCanvas, setupCanvas };
