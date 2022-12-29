import { createCanvas, resizeCanvas } from "../index";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

const canvas = createCanvas({
  // parent: "div#test",
  parent,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
});
const ctx = canvas.getContext("2d")!;

let { width, height } = canvas;

const draw = (width: number, height: number, frameCount: number) => {
  ctx.fillStyle = `gray`;
  ctx.fillRect(0, 0, width, height);

  const rad = width / 4 + Math.sin(frameCount * 0.02) * 100;

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
  ctx.fillStyle = `white`;
  ctx.fill();
};

let frameCount = 0;
const loop = () => {
  window.requestAnimationFrame(loop);
  draw(width, height, frameCount);

  frameCount += 1;
};
loop();

// respond to resize event
window.addEventListener("resize", () => {
  resizeCanvas({
    canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
  });
  width = canvas.width;
  height = canvas.height;
});
