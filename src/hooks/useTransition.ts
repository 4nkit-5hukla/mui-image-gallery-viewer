import { useMemo, useEffect, useState } from "react";
import {
  TransitionEffect,
  TransitionDirection,
} from "@shared/types/gallery.types";
import {
  validateTransitionEffect,
  getTransitionDuration,
} from "@shared/helpers/transitionSelector";

interface UseTransitionProps {
  effect?: TransitionEffect;
  direction?: TransitionDirection;
  duration?: number;
}

export const useTransition = ({
  effect = "fade",
  direction = "forward",
  duration,
}: UseTransitionProps = {}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const validatedEffect = useMemo(() => validateTransitionEffect(effect), [effect]);

  const transitionDuration = useMemo(() => {
    const baseDuration = getTransitionDuration(validatedEffect, duration);
    return prefersReducedMotion ? 0 : baseDuration;
  }, [validatedEffect, duration, prefersReducedMotion]);

  return {
    effect: validatedEffect,
    direction,
    duration: transitionDuration,
    prefersReducedMotion,
  };
};
