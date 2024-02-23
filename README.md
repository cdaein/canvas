# @daeinc/canvas

![npm version badge](https://img.shields.io/npm/v/@daeinc/canvas)
![npm bundle size badge](https://img.shields.io/bundlephobia/min/@daeinc/canvas)

## Install

```sh
npm i @daeinc/canvas
```

then,

```ts
import { createCanvas, ... } from "@daeinc/canvas"
```

## Functions

Documentation is updated for `0.15.0`.

### createCanvas

```ts
const createCanvas: ({
  parent,
  context,
  width,
  height,
  pixelRatio,
  scaleContext,
  attributes,
}: {
  parent?: string | Element | null;
  context?: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
  attributes?:
    | CanvasRenderingContext2DSettings
    | WebGLContextAttributes;
})
```

Create a new canvas and return `{ canvas, context, width, height }` in 2d and `{ canvas, gl, width, height }` in webgl.

The parent can be either `string` (will be used for `querySelector()`) or `Element`. If `parent` is `undefined` or `null`, the canvas is not attached to the document. Returned `width` and `height` may not be the same as `canvas.width` and `canvas.height` due to `pixelRatio` scaling.

`context` supports `2d`, `webgl` or `webgl2` and creates a proper context. When `webgl` context is created, `gl.viewport()` is internally called to scale context according to `pixelRatio` parameter.

### createOffscreenCanvas

```ts
const createOffscreenCanvas: ({
  context,
  width,
  height,
  pixelRatio,
  scaleContext,
  attributes,
}: {
  context: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
  attributes?:
    | CanvasRenderingContext2DSettings
    | WebGLContextAttributes;
})
```

Creates an `OffscreenCanvas`.

### resizeCanvas

```ts
const resizeCanvas: ({
  canvas,
  context,
  width,
  height,
  pixelRatio,
  scaleContext,
  attributes,
}: {
  canvas: HTMLCanvasElement;
  context: "2d" | "webgl" | "webgl2";
  width: number;
  height: number;
  pixelRatio?: number;
  scaleContext?: boolean;
  attributes?:
    | CanvasRenderingContext2DSettings
    | WebGLContextAttributes;
}) => {
  canvas: HTMLCanvasElement;
  context?:
    | CanvasRenderingContext2D
    | WebGLRenderingContext
    | WebGL2RenderingContext;
  gl?: WebGLRenderingContext | WebGL2RenderingContext;
  width: number;
  height: number;
};
```

Resize canvas and return data `{ canvas, context?, gl?, width, height }`. When `scaleContext=true`, it also scale the context to `pixelRatio`.


## License

MIT
