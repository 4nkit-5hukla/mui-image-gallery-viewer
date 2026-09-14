import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const RailImageButton = styled(Box)(({ theme }) => ({
  appearance: "none",
  background: "none",
  border: `2px solid transparent`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  flex: "0 0 auto",
  overflow: "hidden",
  padding: 0,
  transition: theme.transitions.create(["border-color", "opacity"], {
    duration: theme.transitions.duration.shortest,
  }),
  opacity: 0.55,

  "&:hover": {
    opacity: 1,
  },

  "&.active": {
    borderColor: theme.palette.primary.main,
    opacity: 1,
  },
}));

export const RailImageContent = styled("img")({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  userSelect: "none",
});
