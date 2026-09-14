import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ImageGallery from "@components/ImageGallery/ImageGallery";
import { ImageItem } from "@shared/types/gallery.types";

const theme = createTheme();

const sampleImages: ImageItem[] = [
  {
    id: "1",
    src: "image1.jpg",
    alt: "Image 1",
  },
  {
    id: "2",
    src: "image2.jpg",
    alt: "Image 2",
  },
  {
    id: "3",
    src: "image3.jpg",
    alt: "Image 3",
  },
];

const renderWithTheme = (component: ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ImageGallery", () => {
  it("renders without crashing", () => {
    renderWithTheme(
      <ImageGallery images={sampleImages} />
    );
  });

  it("displays the correct image counter", () => {
    renderWithTheme(
      <ImageGallery images={sampleImages} />
    );
    expect(screen.getByText(/1 \/ 3/)).toBeTruthy();
  });

  it("shows no images message when images array is empty", () => {
    renderWithTheme(
      <ImageGallery images={[]} />
    );
    expect(screen.getByText("No images available")).toBeTruthy();
  });

  it("renders the main image", () => {
    renderWithTheme(
      <ImageGallery images={sampleImages} />
    );
    const images = screen.getAllByAltText("Image 1");
    expect(images.length).toBeGreaterThan(0);
  });
});
