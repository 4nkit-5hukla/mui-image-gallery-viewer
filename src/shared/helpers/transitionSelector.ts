import { TransitionEffect, TransitionDirection } from "../types/gallery.types";
import { TRANSITION_EFFECTS, TRANSITION_DURATIONS } from "../constants/transitions";

export const validateTransitionEffect = (effect: string): TransitionEffect => {
  if (TRANSITION_EFFECTS.includes(effect as TransitionEffect)) {
    return effect as TransitionEffect;
  }
  return "fade";
};

export const getTransitionDuration = (
  effect: TransitionEffect,
  customDuration?: number
): number => {
  if (customDuration !== undefined) return customDuration;
  return TRANSITION_DURATIONS[effect] || 300;
};

export const getTransitionVariants = (effect: TransitionEffect, direction?: TransitionDirection) => {
  const isForward = direction === "forward";

  const variants: Record<TransitionEffect, Record<string, unknown>> = {
    fade: {
      enter: { opacity: 1 },
      exit: { opacity: 0 },
      initial: { opacity: 0 },
    },
    slide: {
      enter: { x: 0, opacity: 1 },
      exit: { x: isForward ? 100 : -100, opacity: 0 },
      initial: { x: isForward ? -100 : 100, opacity: 0 },
    },
    slideover: {
      enter: { x: 0, opacity: 1 },
      exit: { x: isForward ? -100 : 100, opacity: 0 },
      initial: { x: isForward ? 100 : -100, opacity: 1 },
    },
    carousel: {
      enter: { rotateY: 0, opacity: 1 },
      exit: { rotateY: isForward ? 45 : -45, opacity: 0 },
      initial: { rotateY: isForward ? -45 : 45, opacity: 0 },
    },
    cube: {
      enter: { rotateY: 0, opacity: 1, perspective: 1000 },
      exit: { rotateY: isForward ? 90 : -90, opacity: 0 },
      initial: { rotateY: isForward ? -90 : 90, opacity: 0 },
    },
    flip: {
      enter: { rotateY: 0, opacity: 1 },
      exit: { rotateY: 180, opacity: 0 },
      initial: { rotateY: -180, opacity: 0 },
    },
    rotate: {
      enter: { rotate: 0, opacity: 1 },
      exit: { rotate: isForward ? 45 : -45, opacity: 0 },
      initial: { rotate: isForward ? -45 : 45, opacity: 0 },
    },
    zoom: {
      enter: { scale: 1, opacity: 1 },
      exit: { scale: isForward ? 0.8 : 1.2, opacity: 0 },
      initial: { scale: isForward ? 1.2 : 0.8, opacity: 0 },
    },
    zoomIn: {
      enter: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
      initial: { scale: 0, opacity: 0 },
    },
  };

  return variants[effect] || variants.fade;
};
