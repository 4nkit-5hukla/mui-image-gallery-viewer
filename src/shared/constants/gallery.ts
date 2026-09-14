export const DEFAULT_RAIL_POSITION = "left" as const;
export const DEFAULT_IMAGES_PER_PAGE = 10;
export const DEFAULT_TRANSITION_DURATION = 300;
export const DEFAULT_TRANSITION_EFFECT = "fade" as const;

export const RAIL_PREFETCH_MARGIN = "300px";
export const RAIL_LOADING_INDICATOR_SIZE = 18;
export const MAX_VISIBLE_PAGE_NUMBERS = 5;

export const RAIL_DIMENSIONS = {
  left: {
    width: 148,
    height: "auto",
    minHeight: 62,
  },
  right: {
    width: 148,
    height: "auto",
    minHeight: 62,
  },
  top: {
    width: "100%",
    height: 148,
    minWidth: 62,
  },
  bottom: {
    width: "100%",
    height: 148,
    minWidth: 62,
  },
} as const;

export const THUMBNAIL_DIMENSIONS = {
  left: { width: 62, height: 92 },
  right: { width: 62, height: 92 },
  top: { width: 92, height: 62 },
  bottom: { width: 92, height: 62 },
} as const;

export const MOBILE_THUMBNAIL_DIMENSIONS = {
  left: { width: 62, height: 62 },
  right: { width: 62, height: 62 },
  top: { width: 62, height: 62 },
  bottom: { width: 62, height: 62 },
} as const;
