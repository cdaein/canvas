import { createCanvas, resizeCanvas } from "../index";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

let canvas = createCanvas({
  parent,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
});
const { width, height } = canvas;
const ctx = canvas.getContext("2d")!;

const draw = (width: number, height: number) => {
  ctx.fillStyle = `gray`;
  ctx.fillRect(0, 0, width, height);

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 4, 0, Math.PI * 2);
  ctx.fillStyle = `white`;
  ctx.fill();
};

draw(width, height);

// respond to resize event
window.addEventListener("resize", () => {
  canvas = resizeCanvas({
    canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
  });
  const { width, height } = canvas;

  draw(width, height);
});
