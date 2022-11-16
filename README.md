# @daeinc/canvas

## Installation

```sh
npm i @daeinc/canvas
```

then,

```ts
import { drawPath, ... } from "@daeinc/canvas"
```

## Functions

It uses two custom types, `Pt` and `Pts`, each representing `number[]` and `Pt[]`.

```ts
import type { Pt, Pts } from "@daeinc/geom";
```

```ts
const createCanvas: ({ width, height, }: {
    width: number;
    height: number;
}) => HTMLCanvasElement;
```
A very minimal Canvas setup.

```ts
const drawCircle: (ctx: CanvasRenderingContext2D, pt: Pt, diam: number) => void;
```

```ts
const drawFillText: (ctx: CanvasRenderingContext2D, msg: string, pt: Pt) => void;
```

```ts
const drawLine: (ctx: CanvasRenderingContext2D, pt1: Pt, pt2: Pt) => void;
```

```ts
const drawPath: (ctx: CanvasRenderingContext2D, path: Pts, close?: boolean) => void;
```

```ts
const drawSmoothPath: (ctx: CanvasRenderingContext2D, path: Pts) => void;
```
Uses quadratic curves to smoothen hard edges of path. The input path is expected to be generated with `generateSmoothPath()` from another package `@daeinc/geom`.

## To Dos

- update demo to use TS
- add `drawText()` or `drawStrokeText()`
  - https://www.w3schools.com/graphics/canvas_text.asp
- add canvas tests

## License

MIT
