import { ImageItem } from "../types/gallery.types";

export const downloadImage = async (image: ImageItem, filename?: string): Promise<void> => {
  try {
    const url = image.src;
    const link = document.createElement("a");

    // Extract filename from URL if not provided
    if (!filename) {
      const urlParts = url.split("/");
      const urlFilename = urlParts?.[urlParts.length - 1]?.split("?")?.[0];
      filename = decodeURIComponent(urlFilename || image.alt || "image");
    }

    // Add .jpg extension if no extension is present
    if (!filename.includes(".")) {
      filename += ".jpg";
    }

    link.href = url;
    link.download = filename;
    link.target = "_blank";

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to download image:", error);
    throw new Error("Failed to download image");
  }
};

export const downloadImageAsBlob = async (
  imageUrl: string
): Promise<Blob> => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.blob();
  } catch (error) {
    console.error("Failed to fetch image:", error);
    throw error;
  }
};

export const downloadImageWithFallback = async (
  image: ImageItem,
  filename?: string
): Promise<void> => {
  try {
    // Try direct download first (works for same-origin)
    await downloadImage(image, filename);
  } catch {
    // Fallback: try fetching as blob and download
    try {
      const blob = await downloadImageAsBlob(image.src);
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download =
        filename ||
        decodeURIComponent(image.alt || "image") + ".jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error: unknown) {
      console.error("All download attempts failed:", error);
      throw error;
    }
  }
};
