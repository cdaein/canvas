import { Context, CtxAttributes, OffCanvasReturn } from "../types";
import { resizeOffscreenCanvas } from "../resizeOffscreenCanvas";

/**
 * create an OffscreenCanvas and context.
 *
 * NOT TESTED!!
 *
 * TODO: fulll implementation
 * TODO: add pixelated option (and test)
 *
 * @param opts.context
 * @param opts.width
 * @param opts.height
 * @param opts.pixelRatio - default: 1
 * @param opts.pixelated - for 2d context
 * @param opts.scaleContext - scale context to keep shape sizes consistent. default: true.
 * @param opts.attributes - context attributes
 * @returns
 */
export const createOffscreenCanvas = <Ctx extends Context>({
  context,
  width,
  height,
  pixelRatio = 1,
  pixelated = false,
  scaleContext = true,
  attributes,
}: {
  context: Ctx;
  width: number;
  height: number;
  pixelRatio?: number;
  pixelated?: boolean;
  scaleContext?: boolean;
  attributes?: CtxAttributes<Ctx>;
}) => {
  // REVIEW: offscreen canvas defines width and height at creation. is it necessary to do it again in resize?
  // keep in mind that there is no canvas.style
  const canvas = new OffscreenCanvas(width * pixelRatio, height * pixelRatio);

  return resizeOffscreenCanvas<Ctx>({
    canvas,
    context,
    width,
    height,
    pixelRatio,
    pixelated,
    scaleContext,
    attributes,
  }) as OffCanvasReturn<Ctx>;
};
