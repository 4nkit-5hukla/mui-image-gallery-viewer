import { FC, useRef } from "react";
import { CircularProgress } from "@mui/material";
import {
  RailContainer,
  RailImages,
  RailLoadingIndicator,
  RailPaginationContainer,
} from "./GalleryRail.styled";
import { GalleryRailProps } from "@shared/types/gallery.types";
import RailImage from "@components/RailImage/RailImage";
import PaginationBar from "@components/PaginationBar/PaginationBar";
import { useLazyLoading } from "@hooks/useLazyLoading";
import { DEFAULT_IMAGES_PER_PAGE } from "@shared/constants/gallery";

const GalleryRail: FC<GalleryRailProps> = ({
  images,
  activeIndex,
  currentPage,
  totalPages,
  railPosition,
  isLoading,
  onImageSelect,
  onPageChange,
  onLoadMore,
  railWidth,
  railBackgroundColor,
  railBorderRadius,
  sx,
}) => {
  const railRef = useRef<HTMLDivElement>(null);
  const { sentinelRef } = useLazyLoading({
    currentPage,
    totalPages,
    itemsPerPage: DEFAULT_IMAGES_PER_PAGE,
    onLoadMore,
    isLoading,
    enabled: totalPages > 1,
    railRef,
  });

  const isVertical = railPosition === "left" || railPosition === "right";

  return (
    <RailContainer
      ref={railRef}
      railPosition={railPosition}
      sx={{
        ...(railWidth && (isVertical ? { width: railWidth } : { height: railWidth })),
        ...(railBackgroundColor && { backgroundColor: railBackgroundColor }),
        ...(railBorderRadius && { borderRadius: railBorderRadius }),
        ...sx,
      }}
    >
      <RailImages railPosition={railPosition}>
        {images.map((image, index) => (
          <RailImage
            key={image.id}
            image={image}
            isActive={index === activeIndex}
            index={index}
            onClick={onImageSelect}
            width={isVertical ? "100%" : undefined}
            height={isVertical ? undefined : "100%"}
            borderRadius={railBorderRadius}
          />
        ))}

        {totalPages > currentPage && (
          <RailLoadingIndicator ref={sentinelRef}>
            {isLoading && <CircularProgress size={18} />}
          </RailLoadingIndicator>
        )}
      </RailImages>

      {totalPages > 1 && (
        <RailPaginationContainer>
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        </RailPaginationContainer>
      )}
    </RailContainer>
  );
};

export default GalleryRail;
