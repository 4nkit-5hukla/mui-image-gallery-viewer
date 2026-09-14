import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const CompareContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "#000",
}));

export const ImageWrapper = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

export const CompareImage = styled("img")({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  userSelect: "none",
  draggable: false,
});

export const SliderHandle = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "4px",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  cursor: "col-resize",
  zIndex: 10,
  transition: theme.transitions.create("backgroundColor", {
    duration: theme.transitions.duration.shortest,
  }),

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "6px",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
  },
}));

export const Label = styled(Box)(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(1, 2),
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  fontSize: "12px",
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  backdropFilter: "blur(4px)",
  pointerEvents: "none",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
}));

export const BeforeLabel = styled(Label)({
  top: "16px",
  left: "16px",
});

export const AfterLabel = styled(Label)({
  top: "16px",
  right: "16px",
});
