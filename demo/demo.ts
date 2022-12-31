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
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: 2,
  scaleContext: true,
});

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
  drawFillText(ctx, "TEXT", [width / 2, height / 2]);
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
  const { width: w, height: h } = resizeCanvas({
    canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: 2,
  });
  width = w;
  height = h;
});
