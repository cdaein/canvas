export type Context = "2d" | "webgl" | "webgl2";

export type CtxAttributes<Ctx extends Context> = Ctx extends "2d"
  ? CanvasRenderingContext2DSettings
  : WebGLContextAttributes;

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
      : never;

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
