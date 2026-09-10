import { describe, it, expect } from "vitest";
import { getInitials, formatCurrency } from "./utils.js";

describe("utils", () => {
  it("returns initials from a name", () => {
    expect(getInitials("Yaovi Gavor")).toBe("YG");
  });

  it("formats currency as a string", () => {
    const result = formatCurrency(65000);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
