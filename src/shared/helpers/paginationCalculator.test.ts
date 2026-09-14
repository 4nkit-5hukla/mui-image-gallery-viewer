import { describe, it, expect } from "vitest";
import {
  calculateTotalPages,
  calculatePageIndices,
  getPageRange,
  isValidPageNumber,
} from "./paginationCalculator";

describe("paginationCalculator", () => {
  describe("calculateTotalPages", () => {
    it("calculates correct number of pages", () => {
      expect(calculateTotalPages(50, 10)).toBe(5);
      expect(calculateTotalPages(100, 25)).toBe(4);
      expect(calculateTotalPages(7, 10)).toBe(1);
    });

    it("returns 0 for invalid inputs", () => {
      expect(calculateTotalPages(0, 10)).toBe(0);
      expect(calculateTotalPages(10, 0)).toBe(0);
      expect(calculateTotalPages(-5, 10)).toBe(0);
    });
  });

  describe("calculatePageIndices", () => {
    it("returns all pages when total is less than max visible", () => {
      const indices = calculatePageIndices(1, 3, 5);
      expect(indices).toEqual([1, 2, 3]);
    });

    it("centers current page in indices", () => {
      const indices = calculatePageIndices(5, 10, 5);
      expect(indices).toContain(5);
      expect(indices.length).toBe(5);
    });

    it("handles first page correctly", () => {
      const indices = calculatePageIndices(1, 10, 5);
      expect(indices[0]).toBe(1);
    });

    it("handles last page correctly", () => {
      const indices = calculatePageIndices(10, 10, 5);
      expect(indices[indices.length - 1]).toBe(10);
    });
  });

  describe("getPageRange", () => {
    it("calculates correct range for first page", () => {
      const [start, end] = getPageRange(1, 10, 50);
      expect(start).toBe(0);
      expect(end).toBe(10);
    });

    it("calculates correct range for middle page", () => {
      const [start, end] = getPageRange(3, 10, 50);
      expect(start).toBe(20);
      expect(end).toBe(30);
    });

    it("respects total items limit", () => {
      const [start, end] = getPageRange(5, 10, 45);
      expect(start).toBe(40);
      expect(end).toBe(45);
    });
  });

  describe("isValidPageNumber", () => {
    it("validates page numbers correctly", () => {
      expect(isValidPageNumber(1, 10)).toBe(true);
      expect(isValidPageNumber(5, 10)).toBe(true);
      expect(isValidPageNumber(10, 10)).toBe(true);
      expect(isValidPageNumber(0, 10)).toBe(false);
      expect(isValidPageNumber(11, 10)).toBe(false);
    });
  });
});
