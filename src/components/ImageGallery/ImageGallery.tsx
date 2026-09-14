import React, { FC, useEffect, useCallback } from "react";
import { GalleryContainer } from "./ImageGallery.styled";
import { ImageGalleryProps } from "@shared/types/gallery.types";
import { useImageGalleryState } from "@hooks/useImageGalleryState";
import { getRailLayoutStyles } from "@shared/helpers/railPositioning";
import { normalizeImages } from "@shared/helpers/imageValidation";
import {
  DEFAULT_RAIL_POSITION,
  DEFAULT_IMAGES_PER_PAGE,
  DEFAULT_TRANSITION_DURATION,
  DEFAULT_TRANSITION_EFFECT,
} from "@shared/constants/gallery";
import GalleryRail from "@components/GalleryRail/GalleryRail";
import ImageViewer from "@components/ImageViewer/ImageViewer";

const ImageGallery: FC<ImageGalleryProps> = ({
  images: rawImages,
  railPosition = DEFAULT_RAIL_POSITION,
  transitionEffect = DEFAULT_TRANSITION_EFFECT,
  transitionDuration = DEFAULT_TRANSITION_DURATION,
  imagesPerPage = DEFAULT_IMAGES_PER_PAGE,
  onImageChange,
  onPageChange: onPageChangeCallback,
  enableLazyLoading = true,
  enablePagination = true,
  showCaptions = false,
  raiseOnHover = true,
  containerHeight = "100%",
  containerWidth = "100%",
  railWidth,
  railThickness,
  railBackgroundColor,
  railHoverEffect = true,
  railBorderRadius,
  sx,
  railSx,
  viewerSx,
  paginationSx,
}) => {
  const images = normalizeImages(rawImages);

  const {
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
  } = useImageGalleryState({
    images,
    imagesPerPage,
  });

  useEffect(() => {
    if (currentImage && onImageChange) {
      onImageChange(currentImage, currentIndex);
    }
  }, [currentIndex, currentImage, onImageChange]);

  const handlePageChange = useCallback(
    (page: number) => {
      goToPage(page);
      onPageChangeCallback?.(page);
    },
    [goToPage, onPageChangeCallback]
  );

  const handleLoadMore = useCallback(() => {
    if (enableLazyLoading && currentPage < totalPages) {
      setIsLoading(true);
      // Simulate async loading
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [currentPage, totalPages, enableLazyLoading, setIsLoading]);

  if (images.length === 0) {
    return (
      <GalleryContainer
        sx={{
          width: containerWidth,
          height: containerHeight,
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        }}
      >
        <div>No images available</div>
      </GalleryContainer>
    );
  }

  const layoutStyles = getRailLayoutStyles(railPosition);

  return (
    <GalleryContainer
      sx={{
        width: containerWidth,
        height: containerHeight,
        ...layoutStyles,
        ...sx,
      }}
    >
      <GalleryRail
        images={images}
        activeIndex={currentIndex}
        currentPage={currentPage}
        totalPages={totalPages}
        railPosition={railPosition}
        isLoading={isLoading}
        onImageSelect={goToImage}
        onPageChange={handlePageChange}
        onLoadMore={handleLoadMore}
        railWidth={railWidth}
        railThickness={railThickness}
        railBackgroundColor={railBackgroundColor}
        railHoverEffect={railHoverEffect}
        railBorderRadius={railBorderRadius}
        sx={railSx}
      />

      <ImageViewer
        image={currentImage}
        index={currentIndex}
        total={images.length}
        transitionEffect={transitionEffect}
        transitionDuration={transitionDuration}
        transitionDirection={transitionDirection}
        showCaption={showCaptions}
        onNext={goToNext}
        onPrev={goPrev}
        sx={viewerSx}
      />
    </GalleryContainer>
  );
};

export default ImageGallery;
