export type Context = "2d" | "webgl" | "webgl2" | "webgpu";

export type CtxAttributes<Ctx extends Context> = Ctx extends "2d"
  ? CanvasRenderingContext2DSettings
  : Ctx extends "webgl" | "webgl2"
    ? WebGLContextAttributes
    : never;

export type CanvasReturn<Ctx extends Context> = Ctx extends "2d"
  ? {
      canvas: HTMLCanvasElement;
      context: CanvasRenderingContext2D;
      width: number;
      height: number;
    }
  : Ctx extends "webgl"
    ? {
        canvas: HTMLCanvasElement;
        gl: WebGLRenderingContext;
        width: number;
        height: number;
      }
    : Ctx extends "webgl2"
      ? {
          canvas: HTMLCanvasElement;
          gl: WebGL2RenderingContext;
          width: number;
          height: number;
        }
      : Ctx extends "webgpu"
        ? {
            canvas: HTMLCanvasElement;
            context: GPUCanvasContext;
            width: number;
            height: number;
          }
        : never;

// TODO: webgpu
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
