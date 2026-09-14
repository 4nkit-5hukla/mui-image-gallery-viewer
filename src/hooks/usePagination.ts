import { useMemo, useCallback } from "react";
import { calculatePageIndices, isValidPageNumber } from "@shared/helpers/paginationCalculator";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

export const usePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: UsePaginationProps) => {
  const pageIndices = useMemo(
    () => calculatePageIndices(currentPage, totalPages, maxVisiblePages),
    [currentPage, totalPages, maxVisiblePages]
  );

  const canGoPrev = useCallback(
    () => isValidPageNumber(currentPage - 1, totalPages),
    [currentPage, totalPages]
  );

  const canGoNext = useCallback(
    () => isValidPageNumber(currentPage + 1, totalPages),
    [currentPage, totalPages]
  );

  const shouldShowEllipsisBefore = pageIndices && pageIndices.length > 0 ? pageIndices[0]! > 1 : false;
  const shouldShowEllipsisAfter = pageIndices && pageIndices.length > 0 ? pageIndices[pageIndices.length - 1]! < totalPages : false;

  return {
    pageIndices,
    canGoPrev: canGoPrev(),
    canGoNext: canGoNext(),
    shouldShowEllipsisBefore,
    shouldShowEllipsisAfter,
    totalPages,
    currentPage,
  };
};
