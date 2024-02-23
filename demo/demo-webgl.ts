import { createCanvas, resizeCanvas } from "../index";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

const { canvas,  gl, width, height } = createCanvas({
  parent: 'body',
  context: "webgl",
  width: 500,
  height: 500,
  pixelRatio: window.devicePixelRatio,
  attributes: {
    preserveDrawingBuffer: true,
  },
}) 

console.log({ width, height });

console.log({ "canvas width": canvas.width, "canvas height": canvas.height });

// Set the viewport to the canvas size
// done inside resizeCanvas()
// gl.viewport(0, 0, width, height);
// (gl as WebGLRenderingContext).viewport(0, 0, 500, 500);

// Clear the canvas
gl.clearColor(0, 0.3, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// Set up the vertices for the circle
const vertices = [];
const numVertices = 10;
const radius = 500 / width;
for (let i = 0; i <= numVertices; i++) {
  const angle = (i / numVertices) * Math.PI * 2;
  vertices.push(radius * Math.cos(angle));
  vertices.push(radius * Math.sin(angle));
}

// Create a buffer to store the vertices
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Create a vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
gl.shaderSource(
  vertexShader,
  `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
  }
`
);
gl.compileShader(vertexShader);

// Create a fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
gl.shaderSource(
  fragmentShader,
  `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }
`
);
gl.compileShader(fragmentShader);

// Create a program and attach the shaders
const program = gl.createProgram()!;
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Set the position attribute
const positionLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Draw the circle
gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
