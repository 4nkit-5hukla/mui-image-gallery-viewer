import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import ImageCompare from "./ImageCompare";

const meta = {
  title: "Components/ImageCompare",
  component: ImageCompare,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageCompare>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageCompare
        beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        afterImage="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80"
        beforeLabel="Mountain"
        afterLabel="Ocean"
        height="100%"
      />
    </Box>
  ),
};

export const EditingComparison: Story = {
  args: {},
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageCompare
        beforeImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
        afterImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        beforeLabel="Original"
        afterLabel="Edited"
        height="100%"
      />
    </Box>
  ),
};

export const FixedHeight: Story = {
  args: {},
  render: () => (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: 4 }}>
      <Box sx={{ width: 600 }}>
        <ImageCompare
          beforeImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
          afterImage="https://images.unsplash.com/photo-1486299519917-8ca273e5e1e7?w=800&q=80"
          beforeLabel="Night"
          afterLabel="Sunrise"
          height="400px"
        />
      </Box>
    </Box>
  ),
};

export const BeforeAfter: Story = {
  args: {},
  render: () => (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ImageCompare
        beforeImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
        afterImage="https://images.unsplash.com/photo-1486299519917-8ca273e5e1e7?w=800&q=80"
        beforeLabel="Before"
        afterLabel="After"
        height="100%"
      />
    </Box>
  ),
};
