# @daeinc/canvas

Note: drawing functions up to `0.7.1` has now moved to [`@daeinc/draw`](https://github.com/cdaein/draw).

## Install

```sh
npm i @daeinc/canvas
```

then,

```ts
import { createCanvas, ... } from "@daeinc/canvas"
```

## Functions

Documentation is updated for `0.10.0`.

### createCanvas

```ts
const createCanvas: ({
  parent,
  mode,
  width,
  height,
  pixelRatio,
  scaleContext,
}: {
  parent?: string | Element | undefined;
  mode?: "2d" | "webgl" | undefined;
  width: number;
  height: number;
  pixelRatio?: number | undefined;
  scaleContext?: boolean | undefined;
}) => {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | WebGLRenderingContext;
  gl?: WebGLRenderingContext | undefined;
  width: number;
  height: number;
};
```

Create a new canvas and return `{ canvas, context, gl?, width, height }`.

It takes an optional `parent` parameter. The parent can be either `string` (will be used for `querySelector()`) or `Element`. Returned `width` and `height` may not be the same as `canvas.width` and `canvas.height` due to `pixelRatio` scaling.

`mode` supports `2d` or `webgl` and creates a proper context. (`webgl2` mode is not yet added.) When `webgl` context is created, `gl` object will also be returned. Internally, `gl.viewport()` is called to scale context according to `pixelRatio` parameter.

Returned `context` may ber `2d` or `webgl`, return type assertions are needed when calling `createCanvas()`. See demos for how to use.

### resizeCanvas

```ts
const resizeCanvas: ({
  canvas,
  mode,
  width,
  height,
  pixelRatio,
  scaleContext,
}: {
  canvas: HTMLCanvasElement;
  mode: "2d" | "webgl";
  width: number;
  height: number;
  pixelRatio?: number | undefined;
  scaleContext?: boolean | undefined;
}) => {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | WebGLRenderingContext;
  gl?: WebGLRenderingContext | undefined;
  width: number;
  height: number;
};
```

Resize canvas and return data `{ canvas, context, gl?, width, height }`. When `scaleContext=true`, it also scale the context to `pixelRatio`.

## Example

See the demo in `demo/demo.ts`.

## License

MIT
