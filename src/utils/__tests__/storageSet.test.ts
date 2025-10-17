import { describe, it, expect, beforeEach, vi } from "vitest";
import { storageSet } from "../index";

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

describe("storageSet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should store simple object in localStorage", () => {
    const testData = { name: "John", age: 30 };

    storageSet("testKey", testData);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify(testData)
    );
  });

  it("should store complex nested object", () => {
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

    storageSet("complexKey", complexData);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "complexKey",
      JSON.stringify(complexData)
    );
  });

  it("should store empty object", () => {
    const emptyData = {};

    storageSet("emptyKey", emptyData);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "emptyKey",
      JSON.stringify(emptyData)
    );
  });

  it("should handle objects with different data types", () => {
    const mixedData = {
      string: "hello",
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      nested: {
        prop: "value",
      },
      nullValue: null,
      undefinedValue: undefined,
    };

    storageSet("mixedKey", mixedData);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "mixedKey",
      JSON.stringify(mixedData)
    );
  });

  it("should handle objects with special characters in keys", () => {
    const specialData = {
      "key-with-dashes": "value1",
      key_with_underscores: "value2",
      "key with spaces": "value3",
      "key.with.dots": "value4",
    };

    storageSet("specialKey", specialData);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "specialKey",
      JSON.stringify(specialData)
    );
  });

  it("should be called exactly once per invocation", () => {
    const testData = { test: "value" };

    storageSet("testKey", testData);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });
});
