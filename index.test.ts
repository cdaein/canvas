import { describe, expect, test } from "@jest/globals";
import "jest-canvas-mock";
import { createCanvas, resizeCanvas } from ".";

describe("createCanvas()", () => {
  const { canvas, context } = createCanvas({
    width: 500,
    height: 500,
  });

  test("has <body> as parent by default", () => {
    expect(canvas.parentNode instanceof HTMLBodyElement).toEqual(true);
    expect(canvas.parentElement!.tagName.toLowerCase()).toEqual("body");
    expect(canvas.parentElement!.nodeName.toLowerCase()).toEqual("body");
  });

  test("returns a new canvas element", () => {
    expect(canvas instanceof HTMLCanvasElement).toBe(true);
    expect(canvas.tagName.toLowerCase()).toEqual("canvas");
    expect(canvas.nodeName.toLowerCase()).toEqual("canvas");
  });

  test("returns correct context object", () => {
    expect(context instanceof CanvasRenderingContext2D).toBe(true);
  });

  test("returns context object from correct canvas", () => {
    const { canvas: anotherCanvas } = createCanvas({ width: 500, height: 500 });
    expect(canvas.getContext("2d") === context).toBe(true);
    expect(anotherCanvas.getContext("2d") === context).toBe(false);
  });
});

describe("createCanvas() with parent", () => {
  const parent = document.createElement("div");
  parent.id = "canvas-container";
  const { canvas } = createCanvas({
    parent,
    width: 500,
    height: 500,
  });

  test("has correct parent element", () => {
    expect(parent instanceof HTMLDivElement).toEqual(true);
    expect(canvas.parentElement!.tagName.toLowerCase()).toEqual("div");
    expect(canvas.parentElement!.nodeName.toLowerCase()).toEqual("div");
    expect(canvas.parentElement!.id).toEqual("canvas-container");
  });
});

describe("createCanvas() with pixelRatio=1", () => {
  const w = 500;
  const h = 300;
  const { canvas, context, width, height } = createCanvas({
    width: w,
    height: h,
    pixelRatio: 1,
  });

  test("returns same width and height as parameters", () => {
    expect(canvas.width).toEqual(w);
    expect(canvas.height).toEqual(h);
  });

  test("returns same style width and height as parameters", () => {
    expect(canvas.style.width).toEqual(`${w}px`);
    expect(canvas.style.height).toEqual(`${h}px`);
  });

  test("scales context correctly (1, 1)", () => {
    const mat = context.getTransform();
    expect(mat.a).toEqual(1); // x scale
    expect(mat.d).toEqual(1); // y scale
  });
});

describe("createCanvas() with pixelRatio=2", () => {
  const w = 500;
  const h = 300;
  const { canvas, context, width, height } = createCanvas({
    width: w,
    height: h,
    pixelRatio: 2,
  });

  test("returns double the width and height as parameters", () => {
    expect(canvas.width).toEqual(w * 2);
    expect(canvas.height).toEqual(h * 2);
  });

  test("returns same style width and height as parameters", () => {
    expect(canvas.style.width).toEqual(`${w}px`);
    expect(canvas.style.height).toEqual(`${h}px`);
  });

  test("scales context correctly (2, 2)", () => {
    const mat = context.getTransform();
    expect(mat.a).toEqual(2); // x scale
    expect(mat.d).toEqual(2); // y scale
  });
});

describe("createCanvas() with pixelRatio=2 & scaleContext=false", () => {
  const w = 500;
  const h = 300;
  const { canvas, context, width, height } = createCanvas({
    width: w,
    height: h,
    pixelRatio: 2,
    scaleContext: false,
  });

  test("does not scale context", () => {
    const mat = context.getTransform();
    expect(mat.a).toEqual(1);
    expect(mat.d).toEqual(1);
  });
});
