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

### createCanvas

```ts
const createCanvas: ({
  parent,
  width,
  height,
  pixelRatio,
  scaleContext,
}: {
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
```

Create a new canvas and return `{ canvas, context, width, height }`. It takes an optional `parent` parameter. The parent can be either `string` (will be used for `querySelector()`) or `Element`. Returned `width` and `height` may not be the same as `canvas.width` and `canvas.height` due to `pixelRatio` scaling.

### resizeCanvas

```ts
const resizeCanvas: ({
  canvas,
  width,
  height,
  pixelRatio,
  scaleContext,
}: {
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
```

Resize canvas and return data `{ canvas, context, width, height }`. When `scaleContext=true`, it also scale the context to `pixelRatio`.

## Example

See the demo in `demo/demo.ts`.

## License

MIT
