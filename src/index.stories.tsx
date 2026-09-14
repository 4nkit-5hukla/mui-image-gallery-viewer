import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import ImageGallery from "@components/ImageGallery/ImageGallery";
import { ImageItem, TransitionEffect } from "@shared/types/gallery.types";

const sampleImages: ImageItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Mountain landscape",
    thumbnailSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",
    caption: "Beautiful mountain landscape",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    alt: "Ocean waves",
    thumbnailSrc: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&q=80",
    caption: "Peaceful ocean waves",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    alt: "Forest path",
    thumbnailSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    caption: "Enchanted forest path",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1486299519917-8ca273e5e1e7?w=800&q=80",
    alt: "Desert sunset",
    thumbnailSrc: "https://images.unsplash.com/photo-1486299519917-8ca273e5e1e7?w=200&q=80",
    caption: "Golden desert sunset",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    alt: "City lights",
    thumbnailSrc: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&q=80",
    caption: "Urban city lights",
  },
];

const largeImageSet: ImageItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  src: `https://images.unsplash.com/photo-${1500000000 + i}?w=800&q=80`,
  alt: `Image ${i + 1}`,
  thumbnailSrc: `https://images.unsplash.com/photo-${1500000000 + i}?w=200&q=80`,
  caption: `Image ${i + 1}`,
}));

const meta = {
  title: "Components/ImageGallery",
  component: ImageGallery,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} />
    </Box>
  ),
};

export const RailPositionLeft: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="left" />
    </Box>
  ),
};

export const RailPositionRight: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="right" />
    </Box>
  ),
};

export const RailPositionTop: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="top" />
    </Box>
  ),
};

export const RailPositionBottom: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="bottom" />
    </Box>
  ),
};

const transitions: TransitionEffect[] = [
  "fade",
  "slide",
  "slideover",
  "carousel",
  "cube",
  "flip",
  "rotate",
  "zoom",
  "zoomIn",
];

export const FadeTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="fade" />
    </Box>
  ),
};

export const SlideTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="slide" />
    </Box>
  ),
};

export const SlideoverTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="slideover" />
    </Box>
  ),
};

export const CarouselTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="carousel" />
    </Box>
  ),
};

export const CubeTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="cube" />
    </Box>
  ),
};

export const FlipTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="flip" />
    </Box>
  ),
};

export const RotateTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="rotate" />
    </Box>
  ),
};

export const ZoomTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="zoom" />
    </Box>
  ),
};

export const ZoomInTransition: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="zoomIn" />
    </Box>
  ),
};

export const WithCaptions: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} showCaptions={true} />
    </Box>
  ),
};

export const LargeDataset: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={largeImageSet}
        imagesPerPage={10}
        enableLazyLoading={true}
        enablePagination={true}
      />
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="left"
        transitionEffect="slide"
      />
    </Box>
  ),
};

export const WithZoom: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        enableZoom={true}
        minZoom={1}
        maxZoom={5}
      />
    </Box>
  ),
};

export const WithDownload: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        enableDownload={true}
      />
    </Box>
  ),
};

export const WithZoomAndDownload: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        enableZoom={true}
        enableDownload={true}
        minZoom={1}
        maxZoom={5}
      />
    </Box>
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="left"
        transitionEffect="fade"
        showCaptions={true}
        enableZoom={true}
        enableDownload={true}
        enablePagination={true}
        enableLazyLoading={true}
      />
    </Box>
  ),
};
