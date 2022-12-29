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

It uses two custom types, `Pt` and `Pts`, each representing `number[]` and `Pt[]`.

```ts
import type { Pt, Pts } from "@daeinc/geom";
```

### createCanvas

```ts
const createCanvas: ({
  parent,
  width,
  height,
  pixelRatio,
}: {
  parent?: string | Element | undefined;
  width: number;
  height: number;
  pixelRatio?: number | undefined;
}) => HTMLCanvasElement;
```

Create a new canvas. It takes an optional `parent` parameter. The parent can be either `string` (will be used for `querySelector()`) or `Element`.

### resizeCanvas

```ts
const resizeCanvas: ({
  canvas,
  width,
  height,
  pixelRatio,
}: {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio: number;
}) => HTMLCanvasElement;
```

Resize a canvas with the given `width`, `height` and `pixelRatio`

## License

MIT
