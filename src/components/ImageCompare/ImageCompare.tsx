import React, { FC, useRef, useState, useEffect, useCallback } from "react";
import { SxProps, Theme } from "@mui/material";
import {
  CompareContainer,
  ImageWrapper,
  CompareImage,
  SliderHandle,
  BeforeLabel,
  AfterLabel,
} from "./ImageCompare.styled";

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: string | number;
  sx?: SxProps<Theme>;
}

const ImageCompare: FC<ImageCompareProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  height = "500px",
  sx,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsSliding(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsSliding(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isSliding || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    },
    [isSliding]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isSliding || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const newPosition = ((touch.clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    },
    [isSliding]
  );

  useEffect(() => {
    if (isSliding) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isSliding, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <CompareContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      sx={{
        height,
        ...sx,
      }}
    >
      {/* Before Image */}
      <ImageWrapper>
        <CompareImage src={beforeImage} alt="Before" />
      </ImageWrapper>

      {/* After Image (Clipped) */}
      <ImageWrapper
        sx={{
          width: `${sliderPosition}%`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <CompareImage src={afterImage} alt="After" />
      </ImageWrapper>

      {/* Slider Handle */}
      <SliderHandle style={{ left: `${sliderPosition}%` }} />

      {/* Labels */}
      <BeforeLabel>{beforeLabel}</BeforeLabel>
      <AfterLabel>{afterLabel}</AfterLabel>
    </CompareContainer>
  );
};

export default ImageCompare;
