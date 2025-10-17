import { describe, it, expect, beforeEach, vi } from "vitest";
import { storageGet } from "../index";

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

describe("storageGet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return parsed JSON data when item exists", () => {
    const testData = { name: "John", age: 30 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));

    const result = storageGet("testKey");

    expect(localStorageMock.getItem).toHaveBeenCalledWith("testKey");
    expect(result).toEqual(testData);
  });

  it("should return null when item does not exist", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const result = storageGet("nonExistentKey");

    expect(localStorageMock.getItem).toHaveBeenCalledWith("nonExistentKey");
    expect(result).toBeNull();
  });

  it("should return null when localStorage returns undefined", () => {
    localStorageMock.getItem.mockReturnValue(undefined);

    const result = storageGet("undefinedKey");

    expect(localStorageMock.getItem).toHaveBeenCalledWith("undefinedKey");
    expect(result).toBeNull();
  });

  it("should handle complex nested objects", () => {
    const complexData = {
      user: {
        profile: {
          name: "Jane",
          preferences: ["option1", "option2"],
        },
      },
      settings: {
        theme: "dark",
        notifications: true,
      },
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(complexData));

    const result = storageGet("complexKey");

    expect(result).toEqual(complexData);
  });

  it("should handle arrays", () => {
    const arrayData = ["item1", "item2", "item3"];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(arrayData));

    const result = storageGet("arrayKey");

    expect(result).toEqual(arrayData);
  });

  it("should handle primitive values", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify("string value"));
    expect(storageGet("stringKey")).toBe("string value");

    localStorageMock.getItem.mockReturnValue(JSON.stringify(42));
    expect(storageGet("numberKey")).toBe(42);

    localStorageMock.getItem.mockReturnValue(JSON.stringify(true));
    expect(storageGet("booleanKey")).toBe(true);
  });
});
