export type Context = "2d" | "webgl" | "webgl2" | "webgpu";

export type CtxAttributes<Ctx extends Context> = Ctx extends "2d"
  ? CanvasRenderingContext2DSettings
  : Ctx extends "webgl" | "webgl2"
    ? WebGLContextAttributes
    : never;

export type ContextType<Ctx extends Context> = Ctx extends "2d"
  ? CanvasRenderingContext2D
  : Ctx extends "webgl"
    ? WebGLRenderingContext
    : Ctx extends "webgl2"
      ? WebGL2RenderingContext
      : Ctx extends "webgpu"
        ? GPUCanvasContext
        : never;

// TODO: simplyfy return object by using `context`, not `gl`.
// it's up to users to rename the property to `gl`.
// export type CanvasReturn<Ctx extends Context> = {
//   canvas: HTMLCanvasElement;
//   context: ContextType<Ctx>;
//   width: number;
//   height: number;
// };

export type CanvasReturn<Ctx extends Context> = Ctx extends "2d"
  ? {
      canvas: HTMLCanvasElement;
      // context: CanvasRenderingContext2D;
      context: ContextType<Ctx>;
      width: number;
      height: number;
    }
  : Ctx extends "webgl"
    ? {
        canvas: HTMLCanvasElement;
        // gl: WebGLRenderingContext;
        gl: ContextType<Ctx>;
        width: number;
        height: number;
      }
    : Ctx extends "webgl2"
      ? {
          canvas: HTMLCanvasElement;
          // gl: WebGL2RenderingContext;
          gl: ContextType<Ctx>;
          width: number;
          height: number;
        }
      : Ctx extends "webgpu"
        ? {
            canvas: HTMLCanvasElement;
            // context: GPUCanvasContext;
            context: ContextType<Ctx>;
            width: number;
            height: number;
          }
        : never;

// REVIEW: can webgpu have offscreen canvas?
export type OffCanvasReturn<Ctx extends Context> = Ctx extends "2d"
  ? {
      canvas: OffscreenCanvas;
      context: OffscreenCanvasRenderingContext2D;
      width: number;
      height: number;
    }
  : Ctx extends "webgl"
    ? {
        canvas: OffscreenCanvas;
        gl: WebGLRenderingContext;
        width: number;
        height: number;
      }
    : Ctx extends "webgl2"
      ? {
          canvas: OffscreenCanvas;
          gl: WebGL2RenderingContext;
          width: number;
          height: number;
        }
      : never;
