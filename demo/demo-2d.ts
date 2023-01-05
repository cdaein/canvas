import { createCanvas, resizeCanvas } from "../index";
import { drawCircle, drawFillText } from "@daeinc/draw";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

// return type assertion is needed as context may be '2d' or 'webgl'
const {
  canvas,
  context: ctx,
  gl,
  width: w,
  height: h,
} = createCanvas({
  // parent: "div#test",
  mode: "2d",
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
  scaleContext: true,
}) as {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gl: WebGLRenderingContext;
  width: number;
  height: number;
};

// gl is only available with webgl mode
console.log(gl === undefined);

// console.log(canvas.width, canvas.height);
// console.log(w, h);

let width = w;
let height = h;

const draw = (width: number, height: number, count: number) => {
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

  draw(width, height, count);

  count++;
};
loop();

// respond to resize event
window.addEventListener("resize", () => {
  ({ width, height } = resizeCanvas({
    canvas,
    mode: "2d",
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: 2,
  }));
});
