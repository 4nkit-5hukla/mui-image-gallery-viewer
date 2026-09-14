import { ImageItem } from "../types/gallery.types";

export const validateImageItem = (image: unknown): image is ImageItem => {
  if (typeof image !== "object" || image === null) return false;

  const item = image as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.src === "string" &&
    typeof item.alt === "string" &&
    item.src.length > 0
  );
};

export const normalizeImages = (images: unknown[]): ImageItem[] => {
  if (!Array.isArray(images)) return [];

  return images
    .filter(validateImageItem)
    .map((img, idx) => ({
      ...img,
      id: img.id || `image-${idx}`,
    }));
};

export const getImageDimensions = async (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};
