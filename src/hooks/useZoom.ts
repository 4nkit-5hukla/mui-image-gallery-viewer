import { useState, useCallback } from "react";

const MIN_ZOOM_DEFAULT = 1;
const MAX_ZOOM_DEFAULT = 5;
const ZOOM_STEP = 0.5;

interface UseZoomProps {
  minZoom?: number;
  maxZoom?: number;
}

export const useZoom = ({ minZoom = MIN_ZOOM_DEFAULT, maxZoom = MAX_ZOOM_DEFAULT }: UseZoomProps = {}) => {
  const [zoom, setZoom] = useState(MIN_ZOOM_DEFAULT);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = { x: 0, y: 0, offsetX: 0, offsetY: 0 };

  const zoomBy = useCallback(
    (delta: number) => {
      setZoom((prev) => Math.min(maxZoom, Math.max(minZoom, prev + delta)));
    },
    [minZoom, maxZoom]
  );

  const resetZoom = useCallback(() => {
    setZoom(MIN_ZOOM_DEFAULT);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomIn = useCallback(() => {
    zoomBy(ZOOM_STEP);
  }, [zoomBy]);

  const zoomOut = useCallback(() => {
    zoomBy(-ZOOM_STEP);
  }, [zoomBy]);

  const startDrag = (clientX: number, clientY: number) => {
    if (zoom === MIN_ZOOM_DEFAULT) return;
    setIsDragging(true);
    dragOrigin.x = clientX;
    dragOrigin.y = clientY;
    dragOrigin.offsetX = pan.x;
    dragOrigin.offsetY = pan.y;
  };

  const handleDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragOrigin.x;
    const deltaY = clientY - dragOrigin.y;
    setPan({
      x: dragOrigin.offsetX + deltaX,
      y: dragOrigin.offsetY + deltaY,
    });
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const canZoomIn = zoom < maxZoom;
  const canZoomOut = zoom > minZoom;

  return {
    zoom,
    pan,
    isDragging,
    canZoomIn,
    canZoomOut,
    zoomBy,
    zoomIn,
    zoomOut,
    resetZoom,
    startDrag,
    handleDrag,
    stopDrag,
  };
};
