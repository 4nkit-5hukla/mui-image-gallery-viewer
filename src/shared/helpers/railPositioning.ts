import { SxProps, Theme } from "@mui/material";
import { RailPosition } from "../types/gallery.types";

export const getRailLayoutStyles = (position: RailPosition): SxProps<Theme> => {
  const baseStyles: SxProps<Theme> = {
    display: "flex",
    position: "relative",
    overflow: "hidden",
  };

  switch (position) {
    case "left":
      return {
        ...baseStyles,
        flexDirection: "row",
      };
    case "right":
      return {
        ...baseStyles,
        flexDirection: "row-reverse",
      };
    case "top":
      return {
        ...baseStyles,
        flexDirection: "column",
      };
    case "bottom":
      return {
        ...baseStyles,
        flexDirection: "column-reverse",
      };
    default:
      return baseStyles;
  }
};

export const getRailContainerStyles = (position: RailPosition): SxProps<Theme> => {
  const baseStyles: SxProps<Theme> = {
    display: "flex",
    gap: 1,
    overflow: "auto",
    flexShrink: 0,
  };

  switch (position) {
    case "left":
    case "right":
      return {
        ...baseStyles,
        flexDirection: "column",
        width: 148,
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        borderRight: position === "left" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        borderLeft: position === "right" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
      };
    case "top":
    case "bottom":
      return {
        ...baseStyles,
        flexDirection: "row",
        width: "100%",
        height: 148,
        overflowX: "auto",
        overflowY: "hidden",
        borderBottom: position === "top" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        borderTop: position === "bottom" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
      };
    default:
      return baseStyles;
  }
};

export const getContentLayoutStyles = (): SxProps<Theme> => {
  const baseStyles: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
    minWidth: 0,
    position: "relative",
  };

  return baseStyles;
};

export const calculateRailDimensions = (
  position: RailPosition,
  customSize?: string | number
): { width?: string | number; height?: string | number } => {
  if (customSize !== undefined) {
    return position === "left" || position === "right"
      ? { width: customSize }
      : { height: customSize };
  }

  return position === "left" || position === "right"
    ? { width: 148 }
    : { height: 148 };
};

export const getScrollDirection = (position: RailPosition): "horizontal" | "vertical" => {
  return position === "top" || position === "bottom" ? "horizontal" : "vertical";
};
