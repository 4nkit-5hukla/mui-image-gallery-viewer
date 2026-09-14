import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box } from "@mui/material";
import ImageGrid from "./ImageGrid";
import Lightbox from "@components/Lightbox/Lightbox";
import { ImageItem } from "@shared/types/gallery.types";

const sampleImages: ImageItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  src: `https://images.unsplash.com/photo-${1500000000 + i}?w=800&q=80`,
  alt: `Image ${i + 1}`,
  thumbnailSrc: `https://images.unsplash.com/photo-${1500000000 + i}?w=200&q=80`,
}));

const meta = {
  title: "Components/ImageGrid",
  component: ImageGrid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <ImageGrid images={sampleImages} />
    </Box>
  ),
};

export const WithLightbox: Story = {
  render: () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <>
        <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
          <ImageGrid
            images={sampleImages}
            onImageClick={(_, index) => {
              setSelectedIndex(index);
              setLightboxOpen(true);
            }}
          />
        </Box>

        <Lightbox
          images={sampleImages}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={selectedIndex}
          enableZoom={true}
          enableDownload={true}
          transitionEffect="fade"
        />
      </>
    );
  },
};

export const CompactGrid: Story = {
  render: () => (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <ImageGrid images={sampleImages} columns={6} gap={1} />
    </Box>
  ),
};

export const NoOverlay: Story = {
  render: () => (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <ImageGrid images={sampleImages} showOverlay={false} />
    </Box>
  ),
};
