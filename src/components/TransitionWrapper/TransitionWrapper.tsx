import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionContainer, TransitionContent } from "./TransitionWrapper.styled";
import { TransitionWrapperProps } from "@shared/types/gallery.types";
import { getTransitionVariants } from "@shared/helpers/transitionSelector";
import { useTransition } from "@hooks/useTransition";

const TransitionWrapper: FC<TransitionWrapperProps> = ({
  children,
  effect,
  direction = "forward",
  duration = 300,
  isActive = true,
}) => {
  const { duration: effectDuration, prefersReducedMotion } = useTransition({
    effect,
    direction,
    duration,
  });

  const variants = getTransitionVariants(effect, direction);

  if (prefersReducedMotion) {
    return (
      <TransitionContainer>
        <TransitionContent>{children}</TransitionContent>
      </TransitionContainer>
    );
  }

  return (
    <TransitionContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key={isActive ? "active" : "inactive"}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initial={variants.initial as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          animate={variants.enter as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          exit={variants.exit as any}
          transition={{ duration: effectDuration / 1000 }}
          style={{ width: "100%", height: "100%" }}
        >
          <TransitionContent>{children}</TransitionContent>
        </motion.div>
      </AnimatePresence>
    </TransitionContainer>
  );
};

export default TransitionWrapper;
