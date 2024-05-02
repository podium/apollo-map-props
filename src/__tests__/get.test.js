import get from "../get";

describe("get", () => {
  it("returns null if object is not an object", () => {
    expect(get(null, "a")).toBeNull();
    expect(get(123, "a")).toBeNull();
  });

  it("returns the value at the given key", () => {
    const obj = { a: { b: 2 } };
    expect(get(obj, "a")).toEqual({ b: 2 });
  });

  it("returns nested value if multiple keys provided", () => {
    const obj = { a: { b: { c: 3 } } };
    expect(get(obj, "a", "b", "c")).toBe(3);
  });

  it("returns undefined if key does not exist", () => {
    const obj = { a: 1 };
    expect(get(obj, "b")).toBeUndefined();
  });
});
