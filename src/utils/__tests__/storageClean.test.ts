import { describe, it, expect, beforeEach, vi } from "vitest";
import { storageClean } from "../index";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("storageClean", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should remove item from localStorage", () => {
    storageClean("testKey");

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("testKey");
  });

  it("should handle removing non-existent keys", () => {
    storageClean("nonExistentKey");

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("nonExistentKey");
  });

  it("should handle keys with special characters", () => {
    const specialKeys = [
      "key-with-dashes",
      "key_with_underscores",
      "key with spaces",
      "key.with.dots",
      "key@with#symbols",
      "123numericKey",
    ];

    specialKeys.forEach((key) => {
      storageClean(key);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(key);
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(
      specialKeys.length
    );
  });

  it("should handle empty string key", () => {
    storageClean("");

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("");
  });

  it("should be called exactly once per invocation", () => {
    storageClean("testKey");

    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple sequential calls", () => {
    const keys = ["key1", "key2", "key3"];

    keys.forEach((key) => storageClean(key));

    keys.forEach((key) => {
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(key);
    });
    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(keys.length);
  });
});
