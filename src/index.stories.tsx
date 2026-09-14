import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import ImageGallery from "@components/ImageGallery/ImageGallery";
import { ImageItem } from "@shared/types/gallery.types";

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
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} />
    </Box>
  ),
};

export const RailPositionLeft: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="left" />
    </Box>
  ),
};

export const RailPositionRight: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="right" />
    </Box>
  ),
};

export const RailPositionTop: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="top" />
    </Box>
  ),
};

export const RailPositionBottom: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} railPosition="bottom" />
    </Box>
  ),
};

export const FadeTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="fade" />
    </Box>
  ),
};

export const SlideTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="slide" />
    </Box>
  ),
};

export const SlideoverTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="slideover" />
    </Box>
  ),
};

export const CarouselTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="carousel" />
    </Box>
  ),
};

export const CubeTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="cube" />
    </Box>
  ),
};

export const FlipTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="flip" />
    </Box>
  ),
};

export const RotateTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="rotate" />
    </Box>
  ),
};

export const ZoomTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="zoom" />
    </Box>
  ),
};

export const ZoomInTransition: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} transitionEffect="zoomIn" />
    </Box>
  ),
};

export const WithCaptions: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery images={sampleImages} showCaptions={true} />
    </Box>
  ),
};

export const LargeDataset: Story = {
  args: { images: largeImageSet },
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
  args: { images: sampleImages },
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
  args: { images: sampleImages },
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
  args: { images: sampleImages },
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
  args: { images: sampleImages },
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
  args: { images: sampleImages },
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

export const CompactGallery: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "600px", borderRadius: 2, overflow: "hidden" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="bottom"
        transitionEffect="slide"
        enableZoom={false}
        railBorderRadius="0"
      />
    </Box>
  ),
};

export const FullscreenWithCaptions: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="left"
        transitionEffect="fade"
        showCaptions={true}
        enableDownload={true}
      />
    </Box>
  ),
};

export const PhotographyPortfolio: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="bottom"
        transitionEffect="fade"
        showCaptions={true}
        enableZoom={true}
        enableDownload={true}
        transitionDuration={500}
      />
    </Box>
  ),
};

export const HorizontalRail: Story = {
  args: { images: largeImageSet.slice(0, 30) },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={largeImageSet.slice(0, 30)}
        railPosition="top"
        transitionEffect="slide"
        imagesPerPage={8}
      />
    </Box>
  ),
};

export const DocumentScanner: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="right"
        transitionEffect="slideover"
        enableZoom={true}
        enableDownload={true}
        minZoom={1}
        maxZoom={8}
        showCaptions={true}
      />
    </Box>
  ),
};

export const ProductShowcase: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="left"
        transitionEffect="carousel"
        enableZoom={true}
        enableDownload={true}
        showCaptions={true}
        railBackgroundColor="#f5f5f5"
        transitionDuration={400}
      />
    </Box>
  ),
};

export const MinimalDesign: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="bottom"
        transitionEffect="fade"
        enableZoom={false}
        railBackgroundColor="#ffffff"
        sx={{ backgroundColor: "#f9f9f9" }}
        railSx={{ padding: "8px" }}
      />
    </Box>
  ),
};

export const AdvancedTransitions: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%", gap: 2, p: 2 }}>
        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, overflow: "hidden" }}>
          <ImageGallery
            images={sampleImages}
            railPosition="bottom"
            transitionEffect="cube"
            transitionDuration={600}
          />
        </Box>
        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, overflow: "hidden" }}>
          <ImageGallery
            images={sampleImages}
            railPosition="bottom"
            transitionEffect="flip"
            transitionDuration={600}
          />
        </Box>
      </Box>
    </Box>
  ),
};

export const TouchFriendly: Story = {
  args: { images: sampleImages },
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageGallery
        images={sampleImages}
        railPosition="bottom"
        transitionEffect="slide"
        enableZoom={true}
        enableDownload={true}
        minZoom={1}
        maxZoom={3}
      />
    </Box>
  ),
};
