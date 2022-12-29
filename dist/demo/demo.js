"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);
const canvas = (0, index_1.createCanvas)({
    // parent: "div#test",
    parent,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
});
const ctx = canvas.getContext("2d");
let { width, height } = canvas;
const draw = (width, height, frameCount) => {
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
    (0, index_1.resizeCanvas)({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
    });
    width = canvas.width;
    height = canvas.height;
});
//# sourceMappingURL=demo.js.map