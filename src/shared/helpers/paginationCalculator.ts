export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  if (totalItems <= 0 || itemsPerPage <= 0) return 0;
  return Math.ceil(totalItems / itemsPerPage);
};

export const calculatePageIndices = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const getPageRange = (
  page: number,
  itemsPerPage: number,
  total: number
): [number, number] => {
  const start = (page - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, total);
  return [start, end];
};

export const shouldShowEllipsis = (indices: number[], total: number): boolean => {
  if (indices.length === 0) return false;
  if (indices[0] > 1) return true;
  if (indices[indices.length - 1] < total) return true;
  return false;
};

export const isValidPageNumber = (page: number, totalPages: number): boolean => {
  return page >= 1 && page <= totalPages;
};
