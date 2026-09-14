import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { PaginationContainer, PaginationButton, EllipsisText } from "./PaginationBar.styled";
import { PaginationBarProps } from "@shared/types/gallery.types";
import { usePagination } from "@hooks/usePagination";

const PaginationBar: FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  maxVisiblePages = 5,
  sx,
}) => {
  const { pageIndices, shouldShowEllipsisBefore, shouldShowEllipsisAfter } = usePagination({
    currentPage,
    totalPages,
    maxVisiblePages,
  });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer sx={sx}>
      {shouldShowEllipsisBefore && <EllipsisText>...</EllipsisText>}

      {pageIndices.map((page) => (
        <PaginationButton
          key={page}
          size="small"
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </PaginationButton>
      ))}

      {shouldShowEllipsisAfter && <EllipsisText>...</EllipsisText>}

      {isLoading && <CircularProgress size={20} />}
    </PaginationContainer>
  );
};

export default PaginationBar;
