import { FC, useCallback } from "react";
import { PlayArrowRounded } from "@mui/icons-material";
import { SxProps, Theme } from "@mui/material";
import {
  GridContainer,
  GridItemContainer,
  GridImage,
  GridOverlay,
  GridPlayButton,
} from "./ImageGrid.styled";
import { ImageItem } from "@shared/types/gallery.types";

interface ImageGridProps {
  images: ImageItem[];
  // eslint-disable-next-line no-unused-vars
  onImageClick?: (image: ImageItem, index: number) => void;
  columns?: number;
  gap?: number;
  showOverlay?: boolean;
  sx?: SxProps<Theme>;
}

const ImageGrid: FC<ImageGridProps> = ({
  images,
  onImageClick,
  columns = 4,
  gap = 2,
  showOverlay = true,
  sx,
}) => {
  const handleImageClick = useCallback(
    (image: ImageItem, index: number) => {
      onImageClick?.(image, index);
    },
    [onImageClick]
  );

  return (
    <GridContainer
      sx={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${1200 / columns}px, 1fr))`,
        gap: gap,
        ...sx,
      }}
    >
      {images.map((image, index) => (
        <GridItemContainer
          key={image.id}
          onClick={() => handleImageClick(image, index)}
          role="button"
          tabIndex={0}
          aria-label={image.alt || `Image ${index + 1}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleImageClick(image, index);
            }
          }}
        >
          <GridImage
            src={image.thumbnailSrc || image.src}
            alt={image.alt}
            loading="lazy"
          />
          {showOverlay && (
            <GridOverlay>
              <GridPlayButton size="large" onClick={(e) => {
                e.stopPropagation();
                handleImageClick(image, index);
              }}>
                <PlayArrowRounded sx={{ fontSize: 48 }} />
              </GridPlayButton>
            </GridOverlay>
          )}
        </GridItemContainer>
      ))}
    </GridContainer>
  );
};

export default ImageGrid;
