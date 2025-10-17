import { describe, it, expect } from "vitest";
import { toCamelCase } from "../index";

describe("toCamelCase", () => {
  it("should convert regular text to camelCase", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
    expect(toCamelCase("first name")).toBe("firstName");
    expect(toCamelCase("user input field")).toBe("userInputField");
  });

  it("should handle single words", () => {
    expect(toCamelCase("hello")).toBe("hello");
    expect(toCamelCase("word")).toBe("word");
  });

  it("should handle empty string", () => {
    expect(toCamelCase("")).toBe("");
  });

  it("should handle undefined input", () => {
    expect(toCamelCase(undefined)).toBe("");
  });

  it("should handle multiple spaces", () => {
    expect(toCamelCase("hello    world")).toBe("helloWorld");
    expect(toCamelCase("  spaced   out  text  ")).toBe("spacedOutText");
  });

  it("should handle mixed case input", () => {
    expect(toCamelCase("Hello World")).toBe("helloWorld");
    expect(toCamelCase("UPPERCASE TEXT")).toBe("uppercaseText");
    expect(toCamelCase("MiXeD cAsE")).toBe("mixedCase");
  });

  it("should handle special characters in words", () => {
    expect(toCamelCase("hello-world")).toBe("hello-world");
    expect(toCamelCase("test_case")).toBe("test_case");
  });

  it("should handle numbers in text", () => {
    expect(toCamelCase("field 1 name")).toBe("field1Name");
    expect(toCamelCase("version 2 update")).toBe("version2Update");
  });
});
