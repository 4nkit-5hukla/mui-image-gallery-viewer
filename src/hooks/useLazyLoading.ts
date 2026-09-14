import { useEffect, useRef, useCallback } from "react";
import { RAIL_PREFETCH_MARGIN } from "@shared/constants/gallery";

interface UseLazyLoadingProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onLoadMore?: () => void;
  isLoading?: boolean;
  enabled?: boolean;
  railRef?: { current: HTMLElement | null };
}

export const useLazyLoading = ({
  currentPage,
  totalPages,
  onLoadMore,
  isLoading = false,
  enabled = true,
  railRef,
}: UseLazyLoadingProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages && onLoadMore && !isLoading) {
      onLoadMore();
    }
  }, [currentPage, totalPages, onLoadMore, isLoading]);

  useEffect(() => {
    if (!enabled || !onLoadMore || !railRef?.current || isLoading) {
      return;
    }

    const root = railRef.current;
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root,
        rootMargin: RAIL_PREFETCH_MARGIN,
      }
    );

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, onLoadMore, railRef, isLoading, handleLoadMore]);

  return {
    sentinelRef,
    shouldLoadMore: currentPage < totalPages && !isLoading,
  };
};
