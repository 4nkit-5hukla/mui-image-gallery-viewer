import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { RailPosition } from "@shared/types/gallery.types";

const getContainerStyles = (position: RailPosition) => {
  const baseStyles = {
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
        flexDirection: "column" as const,
        width: 148,
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        borderRight: position === "left" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        borderLeft: position === "right" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        padding: "16px 12px",
      };
    case "top":
    case "bottom":
      return {
        ...baseStyles,
        flexDirection: "row" as const,
        width: "100%",
        height: 148,
        overflowX: "auto",
        overflowY: "hidden",
        borderBottom: position === "top" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        borderTop: position === "bottom" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        padding: "12px 16px",
      };
    default:
      return baseStyles;
  }
};

// Using as any to bypass complex MUI styled-components type issues with custom props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RailContainer = (styled as any)(Box, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shouldForwardProp: (prop: any) => prop !== "railPosition",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
})(({ railPosition, theme }: any) => {
  const containerStyles = getContainerStyles(railPosition);

  return {
    ...containerStyles,
    backgroundColor: theme.palette.background.paper,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollBehavior: "smooth" as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollbarWidth: "thin" as any,

    "&::-webkit-scrollbar": {
      width: railPosition === "left" || railPosition === "right" ? "6px" : "auto",
      height: railPosition === "top" || railPosition === "bottom" ? "6px" : "auto",
    },

    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "3px",

      "&:hover": {
        background: "rgba(255, 255, 255, 0.3)",
      },
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export const RailImages = styled(Box, {
  shouldForwardProp: (prop) => prop !== "railPosition",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
})<{ railPosition: RailPosition }>(({ railPosition }: any) => {
  const isVertical = railPosition === "left" || railPosition === "right";

  return {
    display: "flex",
    flexDirection: isVertical ? ("column" as const) : ("row" as const),
    gap: 1,
    flex: 1,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export const RailLoadingIndicator = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  minWidth: "44px",
  flex: "0 0 auto",
  color: "rgba(255, 255, 255, 0.55)",
}));

export const RailPaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  padding: theme.spacing(1, 0),
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  flexShrink: 0,
  flexWrap: "wrap",
}));
