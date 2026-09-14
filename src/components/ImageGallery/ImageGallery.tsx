import { FC, useEffect, useCallback } from "react";
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
  showCaptions = false,
  enableZoom = false,
  enableDownload = false,
  containerHeight = "100%",
  containerWidth = "100%",
  railWidth,
  railThickness,
  railBackgroundColor,
  railHoverEffect = true,
  railBorderRadius,
  minZoom = 1,
  maxZoom = 5,
  sx,
  railSx,
  viewerSx,
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          width: containerWidth as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          height: containerHeight as any,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        width: containerWidth as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        height: containerHeight as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(layoutStyles as any),
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
        enableZoom={enableZoom}
        enableDownload={enableDownload}
        minZoom={minZoom}
        maxZoom={maxZoom}
        onNext={goToNext}
        onPrev={goPrev}
        sx={viewerSx}
      />
    </GalleryContainer>
  );
};

export default ImageGallery;
