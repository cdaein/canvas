import { createCanvas, resizeCanvas } from "../index";
import * as THREE from "three/webgpu";
import { Fn, normalLocal, vec4 } from "three/tsl";

const parent = document.createElement("div");
parent.id = "app";
document.body.appendChild(parent);

const {
  canvas,
  context,
  width: w,
  height: h,
} = createCanvas({
  parent: "body",
  context: "webgpu",
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
  // scaleContext: false,
});

let width = w;
let height = h;

const fitCanvasToParent = () => {
  // resizing canvas style when !fullscreen
  // const margin = 50; // px
  const margin = 0; // px
  const canvasParent = canvas.parentElement!;

  // if canvas is child of body
  const parentWidth = canvasParent.clientWidth;
  const parentHeight = canvasParent.clientHeight;
  const scale = Math.min(
    1,
    Math.min(
      (parentWidth - margin * 2) / width,
      (parentHeight - margin * 2) / height,
    ),
  );
  canvas.style.transform = `scale(${scale})`;
};

// respond to resize event
window.addEventListener("resize", () => {
  ({ width, height } = resizeCanvas({
    canvas,
    context: "webgpu",
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
    pixelated: false,
  }));

  // NOTE: renderer.setSize() must be called after resizing canvas
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  console.log("canvas width:", canvas.width);

  fitCanvasToParent();
});

console.log({ width, height });
console.log({ "canvas width": canvas.width, "canvas height": canvas.height });

// three setup
const renderer = new THREE.WebGPURenderer({ canvas });
await renderer.init();

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(1, 2, 3);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.NodeMaterial();
material.colorNode = Fn(() => {
  return vec4(normalLocal, 1);
})();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
