import { FC, useCallback } from "react";
import { Dialog, DialogContent, DialogProps } from "@mui/material";
import { ImageGalleryProps, ImageItem } from "@shared/types/gallery.types";
import ImageGallery from "@components/ImageGallery/ImageGallery";

interface LightboxProps extends Omit<ImageGalleryProps, "containerHeight" | "containerWidth"> {
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
  dialogProps?: Partial<DialogProps>;
}

const Lightbox: FC<LightboxProps> = ({
  images,
  open,
  onClose,
  initialIndex,
  dialogProps,
  ...galleryProps
}) => {
  // Note: initialIndex is accepted but not used - it's for future enhancement
  void initialIndex;
  const handleImageChange = useCallback(
    (image: ImageItem, index: number) => {
      galleryProps.onImageChange?.(image, index);
    },
    [galleryProps]
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: "rgba(14, 14, 17, 0.97)",
          backdropFilter: "blur(14px)",
        },
      }}
      {...dialogProps}
    >
      <DialogContent sx={{ padding: 0, height: "100vh" }}>
        <ImageGallery
          {...galleryProps}
          images={images}
          onImageChange={handleImageChange}
          containerHeight="100%"
          containerWidth="100%"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Lightbox;
