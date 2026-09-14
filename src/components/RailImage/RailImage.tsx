import React, { FC, memo } from "react";
import { RailImageButton, RailImageContent } from "./RailImage.styled";
import { RailImageProps } from "@shared/types/gallery.types";

const RailImage: FC<RailImageProps> = ({
  image,
  isActive,
  index,
  onClick,
  width = 92,
  height = 92,
  borderRadius = "8px",
  sx,
}) => {
  const handleClick = () => onClick(index);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <RailImageButton
      component="button"
      className={isActive ? "active" : ""}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{
        width,
        height,
        borderRadius,
        ...sx,
      }}
      role="tab"
      aria-selected={isActive}
      aria-label={image.alt || `Image ${index + 1}`}
      tabIndex={isActive ? 0 : -1}
    >
      <RailImageContent
        src={image.thumbnailSrc || image.src}
        alt={image.alt}
        loading={image.loading || "lazy"}
      />
    </RailImageButton>
  );
};

export default memo(RailImage);
