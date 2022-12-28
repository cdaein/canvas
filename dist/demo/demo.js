"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);
const canvas = (0, index_1.createCanvas)({
    parent,
    width: 800,
    height: 500,
    pixelRatio: 2,
});
const ctx = canvas.getContext("2d");
const { width, height } = canvas;
ctx.fillStyle = `gray`;
ctx.fillRect(0, 0, width, height);
ctx.beginPath();
ctx.arc(width / 2, height / 2, width / 4, 0, Math.PI * 2);
ctx.fillStyle = `white`;
ctx.fill();
//# sourceMappingURL=demo.js.map