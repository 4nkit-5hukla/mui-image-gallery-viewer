import { useState, useCallback, useEffect } from "react";
import { ImageItem, TransitionDirection } from "@shared/types/gallery.types";

interface UseImageGalleryStateProps {
  images: ImageItem[];
  imagesPerPage?: number;
}

export const useImageGalleryState = ({
  images,
  imagesPerPage = 10,
}: UseImageGalleryStateProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>("forward");
  const [isLoading, setIsLoading] = useState(false);

  const currentImage = images[currentIndex] ?? null;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  useEffect(() => {
    const page = Math.floor(currentIndex / imagesPerPage) + 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [currentIndex, imagesPerPage, currentPage]);

  const goToImage = useCallback(
    (index: number) => {
      if (images.length === 0) return;

      const normalizedIndex = ((index % images.length) + images.length) % images.length;
      const direction = normalizedIndex > currentIndex ? "forward" : "backward";

      setTransitionDirection(direction);
      setCurrentIndex(normalizedIndex);
    },
    [images.length, currentIndex]
  );

  const goToNext = useCallback(() => {
    goToImage(currentIndex + 1);
  }, [currentIndex, goToImage]);

  const goPrev = useCallback(() => {
    goToImage(currentIndex - 1);
  }, [currentIndex, goToImage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;

      const newIndex = (page - 1) * imagesPerPage;
      const direction = page > currentPage ? "forward" : "backward";

      setTransitionDirection(direction);
      setCurrentPage(page);
      setCurrentIndex(Math.min(newIndex, images.length - 1));
    },
    [imagesPerPage, currentPage, totalPages, images.length]
  );

  return {
    currentIndex,
    currentImage,
    currentPage,
    transitionDirection,
    isLoading,
    totalPages,
    goToImage,
    goToNext,
    goPrev,
    goToPage,
    setIsLoading,
  };
};
