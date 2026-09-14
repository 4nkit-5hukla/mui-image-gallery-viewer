import { FC, useEffect, useCallback, useRef, WheelEvent, PointerEvent } from "react";
import { IconButton } from "@mui/material";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  AddRounded,
  RemoveRounded,
  DownloadRounded,
  RestartAltRounded,
} from "@mui/icons-material";
import {
  ViewerContainer,
  ViewerTopBar,
  ViewerCounter,
  ViewerTopActions,
  ViewerCanvas,
  ViewerImage,
  ViewerCaption,
  ViewerNavButton,
  ViewerToolbar,
  ZoomDisplay,
  ZoomButton,
  Separator,
} from "./ImageViewer.styled";
import { ImageViewerProps } from "@shared/types/gallery.types";
import TransitionWrapper from "@components/TransitionWrapper/TransitionWrapper";
import { useZoom } from "@hooks/useZoom";
import { downloadImageWithFallback } from "@shared/helpers/downloadImage";

const ImageViewer: FC<ImageViewerProps> = ({
  image,
  index,
  total,
  transitionEffect,
  transitionDuration,
  transitionDirection,
  showCaption,
  enableZoom = false,
  enableDownload = false,
  minZoom = 1,
  maxZoom = 5,
  onNext,
  onPrev,
  sx,
}) => {
  const canGoPrev = total > 1;
  const canGoNext = total > 1;

  const {
    zoom,
    pan,
    isDragging,
    canZoomIn,
    canZoomOut,
    zoomIn,
    zoomOut,
    resetZoom,
    startDrag,
    handleDrag,
    stopDrag,
  } = useZoom({ minZoom, maxZoom });

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (enableZoom) {
        if (e.key === "+" || e.key === "=") {
          e.preventDefault();
          zoomIn();
        } else if (e.key === "-" || e.key === "_") {
          e.preventDefault();
          zoomOut();
        } else if (e.key === "0") {
          e.preventDefault();
          resetZoom();
        }
      }
    },
    [onNext, onPrev, enableZoom, zoomIn, zoomOut, resetZoom]
  );

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      if (!enableZoom) return;
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    },
    [enableZoom, zoomIn, zoomOut]
  );

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!enableZoom || zoom === minZoom) return;
      canvasRef.current?.setPointerCapture(e.pointerId);
      startDrag(e.clientX, e.clientY);
    },
    [enableZoom, zoom, minZoom, startDrag]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      handleDrag(e.clientX, e.clientY);
    },
    [isDragging, handleDrag]
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (isDragging) {
        canvasRef.current?.releasePointerCapture(e.pointerId);
        stopDrag();
      }
    },
    [isDragging, stopDrag]
  );

  const handleDownload = useCallback(async () => {
    if (!image) return;
    try {
      await downloadImageWithFallback(image);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [image]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!image) {
    return null;
  }

  const imageStyle = enableZoom
    ? {
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        transition: isDragging ? "none" : "transform 0.18s ease",
        cursor: zoom > minZoom ? (isDragging ? "grabbing" : "grab") : "auto",
      }
    : {};

  return (
    <ViewerContainer sx={sx}>
      <ViewerTopBar>
        <ViewerCounter>
          {index + 1} / {total}
        </ViewerCounter>
        <ViewerTopActions>
          {enableDownload && (
            <IconButton
              onClick={handleDownload}
              size="small"
              aria-label="Download image"
              title="Download image"
              sx={{ color: "white" }}
            >
              <DownloadRounded sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </ViewerTopActions>
      </ViewerTopBar>

      <ViewerCanvas
        ref={canvasRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
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
            style={imageStyle}
          />
        </TransitionWrapper>

        {canGoPrev && (
          <ViewerNavButton
            component="button"
            className="prev"
            onClick={onPrev}
            aria-label="Previous image"
            title="Previous image (← or A)"
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
            title="Next image (→ or D)"
          >
            <ChevronRightRounded sx={{ fontSize: 24 }} />
          </ViewerNavButton>
        )}

        {enableZoom && (
          <ViewerToolbar>
            <ZoomButton
              onClick={zoomOut}
              disabled={!canZoomOut}
              title="Zoom out (-)"
              aria-label="Zoom out"
            >
              <RemoveRounded />
            </ZoomButton>

            <ZoomDisplay>{Math.round(zoom * 100)}%</ZoomDisplay>

            <ZoomButton
              onClick={resetZoom}
              disabled={zoom === minZoom}
              title="Reset zoom (0)"
              aria-label="Reset zoom"
            >
              <RestartAltRounded sx={{ fontSize: 18 }} />
            </ZoomButton>

            <ZoomButton
              onClick={zoomIn}
              disabled={!canZoomIn}
              title="Zoom in (+)"
              aria-label="Zoom in"
            >
              <AddRounded />
            </ZoomButton>

            {enableDownload && (
              <>
                <Separator />
                <ZoomButton
                  onClick={handleDownload}
                  title="Download image"
                  aria-label="Download image"
                >
                  <DownloadRounded sx={{ fontSize: 18 }} />
                </ZoomButton>
              </>
            )}
          </ViewerToolbar>
        )}

        {showCaption && image.caption && (
          <ViewerCaption>{image.caption}</ViewerCaption>
        )}
      </ViewerCanvas>
    </ViewerContainer>
  );
};

export default ImageViewer;
