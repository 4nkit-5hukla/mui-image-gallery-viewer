import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ViewerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
  minWidth: 0,
  position: "relative",
  backgroundColor: "rgba(14, 14, 17, 0.97)",
  backdropFilter: "blur(14px)",
}));

export const ViewerTopBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 2),
  flexShrink: 0,
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  color: "rgba(255, 255, 255, 0.65)",
}));

export const ViewerCounter = styled(Box)({
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.04em",
});

export const ViewerTopActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.25),
}));

export const ViewerCanvas = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  minHeight: 0,
  minWidth: 0,
  overflow: "hidden",
  padding: theme.spacing(1, 2),
  touchAction: "none",
  position: "relative",
}));

export const ViewerImage = styled("img")({
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
  userSelect: "none",
  display: "block",
});

export const ViewerCaption = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "white",
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  maxWidth: "80%",
  textAlign: "center",
  fontSize: "14px",
  backdropFilter: "blur(8px)",
}));

export const ViewerNavButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  border: "none",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  color: "white",
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest,
  }),
  padding: 0,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  "&.prev": {
    left: theme.spacing(1),
  },

  "&.next": {
    right: theme.spacing(1),
  },
}));

export const ViewerToolbar = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(3),
  backdropFilter: "blur(8px)",
  zIndex: 10,
}));

export const ZoomDisplay = styled(Box)(({ theme }) => ({
  color: "white",
  fontSize: "12px",
  fontWeight: 600,
  minWidth: "50px",
  textAlign: "center",
  padding: theme.spacing(0.5, 1),
}));

export const ZoomButton = styled("button")(({ theme }) => ({
  appearance: "none",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  padding: theme.spacing(0.75),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest,
  }),

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },

  "&:disabled": {
    opacity: 0.4,
    cursor: "not-allowed",
  },

  svg: {
    fontSize: 20,
  },
}));

export const Separator = styled(Box)({
  width: "1px",
  height: "24px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  margin: "0 4px",
});
