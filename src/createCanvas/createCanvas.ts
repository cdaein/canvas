import { appendChild } from "@daeinc/dom";
import { resizeCanvas } from "../resizeCanvas";
import { CanvasReturn, Context, CtxAttributes } from "../types";

/**
 * create a new canvas element and attach to document. Returned width&height may not be the same as canvas.width&height due to pixelRatio scaling.
 * 
 * TODO: add pixelated option
 *
 * @param {object.<string,any>} opts - obtions object
 * @param opts.parent - parent string or element
 * @param opts.context - which context to use
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.pixelated - for 2d context
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns object - { canvas, context?, gl?, width, height }

 */
export const createCanvas = <Ctx extends Context>({
  parent,
  context,
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  parent?: string | Element | null;
  context?: Ctx;
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: Ctx extends "webgpu" ? undefined : boolean;
  attributes?: CtxAttributes<Ctx>;
}) => {
  const canvas = document.createElement("canvas");

  if (parent) {
    appendChild(parent, canvas);
  } else {
    canvas.style.display = `none`;
  }

  return resizeCanvas<Ctx>({
    canvas,
    context: context || "2d",
    width,
    height,
    pixelRatio,
    pixelated,
    scaleContext,
    attributes,
  }) as CanvasReturn<Ctx>;
};
