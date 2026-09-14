import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export type RailPosition = "left" | "right" | "top" | "bottom";

export type TransitionEffect =
  | "fade"
  | "slide"
  | "slideover"
  | "carousel"
  | "cube"
  | "flip"
  | "rotate"
  | "zoom"
  | "zoomIn";

export type TransitionDirection = "forward" | "backward";

export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  thumbnailSrc?: string;
  caption?: string;
  loading?: "eager" | "lazy";
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ImageGalleryProps {
  images: ImageItem[];
  railPosition?: RailPosition;
  transitionEffect?: TransitionEffect;
  transitionDuration?: number;
  imagesPerPage?: number;
  onImageChange?: (image: ImageItem, index: number) => void;
  onPageChange?: (page: number) => void;
  enableLazyLoading?: boolean;
  enablePagination?: boolean;
  showCaptions?: boolean;
  raiseOnHover?: boolean;
  containerHeight?: string | number;
  containerWidth?: string | number;
  railWidth?: string | number;
  railThickness?: string | number;
  railBackgroundColor?: string;
  railHoverEffect?: boolean;
  railBorderRadius?: string | number;
  sx?: SxProps<Theme>;
  railSx?: SxProps<Theme>;
  viewerSx?: SxProps<Theme>;
  paginationSx?: SxProps<Theme>;
}

export interface RailImageProps {
  image: ImageItem;
  isActive: boolean;
  index: number;
  onClick: (index: number) => void;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  sx?: SxProps<Theme>;
}

export interface TransitionWrapperProps {
  children: ReactNode;
  effect: TransitionEffect;
  direction?: TransitionDirection;
  duration?: number;
  isActive?: boolean;
}

export interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  maxVisiblePages?: number;
  sx?: SxProps<Theme>;
}

export interface GalleryRailProps {
  images: ImageItem[];
  activeIndex: number;
  currentPage: number;
  totalPages: number;
  railPosition: RailPosition;
  isLoading: boolean;
  onImageSelect: (index: number) => void;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  railWidth?: string | number;
  railThickness?: string | number;
  railBackgroundColor?: string;
  railHoverEffect?: boolean;
  railBorderRadius?: string | number;
  sx?: SxProps<Theme>;
}

export interface ImageViewerProps {
  image: ImageItem | null;
  index: number;
  total: number;
  transitionEffect: TransitionEffect;
  transitionDuration: number;
  transitionDirection: TransitionDirection;
  showCaption: boolean;
  onNext: () => void;
  onPrev: () => void;
  sx?: SxProps<Theme>;
}
