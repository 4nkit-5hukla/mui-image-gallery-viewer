import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  padding: theme.spacing(1),
  flexWrap: "wrap",
}));

export const PaginationButton = styled(IconButton)(({ theme }) => ({
  minWidth: "32px",
  height: "32px",
  padding: "4px 8px",
  fontSize: "12px",
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.shortest,
  }),

  "&.active": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const EllipsisText = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  opacity: 0.6,
}));
