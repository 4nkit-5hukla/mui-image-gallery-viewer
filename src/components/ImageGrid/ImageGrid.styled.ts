import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

export const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  width: "100%",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export const GridItemContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingBottom: "100%",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: theme.transitions.create(["transform", "box-shadow"], {
    duration: theme.transitions.duration.shorter,
  }),

  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
}));

export const GridImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const GridOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),

  "$gridItemContainer:hover &": {
    opacity: 1,
  },
}));

export const GridPlayButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(4px)",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
}));
