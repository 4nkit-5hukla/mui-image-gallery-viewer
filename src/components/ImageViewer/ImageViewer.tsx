import React, { FC, useEffect, useCallback } from "react";
import { IconButton } from "@mui/material";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import {
  ViewerContainer,
  ViewerTopBar,
  ViewerCounter,
  ViewerTopActions,
  ViewerCanvas,
  ViewerImage,
  ViewerCaption,
  ViewerNavButton,
} from "./ImageViewer.styled";
import { ImageViewerProps } from "@shared/types/gallery.types";
import TransitionWrapper from "@components/TransitionWrapper/TransitionWrapper";

const ImageViewer: FC<ImageViewerProps> = ({
  image,
  index,
  total,
  transitionEffect,
  transitionDuration,
  transitionDirection,
  showCaption,
  onNext,
  onPrev,
  sx,
}) => {
  const canGoPrev = total > 1;
  const canGoNext = total > 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    },
    [onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!image) {
    return null;
  }

  return (
    <ViewerContainer sx={sx}>
      <ViewerTopBar>
        <ViewerCounter>
          {index + 1} / {total}
        </ViewerCounter>
        <ViewerTopActions>
          {/* Future action buttons can go here */}
        </ViewerTopActions>
      </ViewerTopBar>

      <ViewerCanvas>
        <TransitionWrapper
          effect={transitionEffect}
          direction={transitionDirection}
          duration={transitionDuration}
          isActive={true}
        >
          <ViewerImage
            src={image.src}
            alt={image.alt}
            loading="eager"
            draggable={false}
          />
        </TransitionWrapper>

        {canGoPrev && (
          <ViewerNavButton
            component="button"
            className="prev"
            onClick={onPrev}
            aria-label="Previous image"
            title="Previous image"
          >
            <ChevronLeftRounded sx={{ fontSize: 24 }} />
          </ViewerNavButton>
        )}

        {canGoNext && (
          <ViewerNavButton
            component="button"
            className="next"
            onClick={onNext}
            aria-label="Next image"
            title="Next image"
          >
            <ChevronRightRounded sx={{ fontSize: 24 }} />
          </ViewerNavButton>
        )}

        {showCaption && image.caption && (
          <ViewerCaption>{image.caption}</ViewerCaption>
        )}
      </ViewerCanvas>
    </ViewerContainer>
  );
};

export default ImageViewer;
