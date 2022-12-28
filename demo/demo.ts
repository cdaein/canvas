import { createCanvas } from "../index";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

const canvas = createCanvas({
  parent,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: 2,
});
const ctx = canvas.getContext("2d")!;
const { width, height } = canvas;

ctx.fillStyle = `gray`;
ctx.fillRect(0, 0, width, height);

ctx.beginPath();
ctx.arc(width / 2, height / 2, width / 4, 0, Math.PI * 2);
ctx.fillStyle = `white`;
ctx.fill();
