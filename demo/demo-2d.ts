import { createCanvas, resizeCanvas } from "../index";
import { drawCircle, drawFillText } from "@daeinc/draw";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

const {
  canvas,
  context: ctx,
  width: w,
  height: h,
} = createCanvas({
  // parent: "div#test",
  parent: "body",
  context: "2d",
  width: 500,
  height: 500,
  pixelRatio: window.devicePixelRatio,
  scaleContext: true,
  attributes: {
    alpha: false,
  },
});

console.log(ctx.getContextAttributes());

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
    context: "2d",
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: 2,
  }));
});
