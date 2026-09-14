import { TransitionEffect } from "../types/gallery.types";

export const TRANSITION_EFFECTS: TransitionEffect[] = [
  "fade",
  "slide",
  "slideover",
  "carousel",
  "cube",
  "flip",
  "rotate",
  "zoom",
  "zoomIn",
];

export const TRANSITION_DURATIONS: Record<TransitionEffect, number> = {
  fade: 300,
  slide: 400,
  slideover: 400,
  carousel: 500,
  cube: 600,
  flip: 600,
  rotate: 500,
  zoom: 350,
  zoomIn: 350,
};

export const MIN_TRANSITION_DURATION = 200;
export const MAX_TRANSITION_DURATION = 1000;
