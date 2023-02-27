import { createCanvas, createOffscreenCanvas, resizeCanvas } from "../index";
import { drawCircle, drawFillText } from "@daeinc/draw";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

// main canvas
const {
  canvas,
  context: ctx,
  gl,
  width: w,
  height: h,
} = createCanvas({
  // parent: "div#test",
  context: "2d",
  width: 500,
  height: 500,
  pixelRatio: window.devicePixelRatio,
  scaleContext: true,
  attributes: {
    alpha: false,
  },
}) as {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gl: WebGLRenderingContext;
  width: number;
  height: number;
};

let width = w;
let height = h;

// gl is only available with webgl mode
console.assert(gl === undefined);
console.log(ctx.getContextAttributes());

// offscreen canvas
const {
  canvas: offCanvas,
  context: offCtx,
  width: offW,
  height: offH,
} = createOffscreenCanvas({
  context: "2d",
  width,
  height,
  pixelRatio: window.devicePixelRatio,
  attributes: {
    willReadFrequently: true,
  },
}) as {
  canvas: OffscreenCanvas;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
};

const draw = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  count: number
) => {
  ctx.fillStyle = `gray`;
  ctx.fillRect(0, 0, width, height);

  drawCircle(ctx, [width / 2, height / 2], 250);
  ctx.fillStyle = `white`;
  ctx.fill();

  ctx.beginPath();
  ctx.font = `${50 + Math.sin(count * 0.01) * 30}px serif`;
  ctx.textAlign = `center`;
  ctx.fillStyle = `black`;
  drawFillText(ctx, "2D Canvas", [width / 2, height / 2]);
  ctx.fill();
};

let count = 0;
const loop = () => {
  window.requestAnimationFrame(loop);

  // draw to offscreenCanvas
  draw(offCtx, width, height, count);
  // get offscren pixel data
  const imageData = offCtx.getImageData(0, 0, width * 2, height * 2);
  // draw onto main canvas
  ctx.putImageData(imageData, 0, 0);

  count++;
};
loop();

// respond to resize event
window.addEventListener("resize", () => {
  ({ width, height } = resizeCanvas({
    canvas,
    context: "2d",
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
  }));

  resizeCanvas({
    canvas: offCanvas,
    context: "2d",
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
  });
});
