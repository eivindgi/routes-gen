import { route } from "./route";

it("supports optional params (issue 31)", () => {
  expect(route("/reports/:type?/:id/", { id: "123" })).toEqual("/reports/123/");

  expect(route("/reports/:type?/:id/", { id: "123", type: "annual" })).toEqual(
    "/reports/annual/123/"
  );

  expect(route("/reports/:id/:type?/", { id: "123" })).toEqual("/reports/123/");

  expect(route("/reports/:id/:type?/", { id: "123", type: "annual" })).toEqual(
    "/reports/123/annual/"
  );
});

it("only replaces the first occurrence when param names share the same prefix", () => {
  expect(
    route("/podcasts/:topic/:topicId", { topic: "sports", topicId: "123" })
  ).toEqual("/podcasts/sports/123");

  expect(
    route("/podcasts/:topicId/:topic", { topic: "sports", topicId: "123" })
  ).toEqual("/podcasts/123/sports");
});

it('should return the same path when no params are provided', () => {
  expect(route("/test")).toEqual("/test");
});

it('should replace :id with provided id', () => {
  expect(route("/:id", { id: "test" })).toEqual("/test");
  expect(route("/:id", { id: 1 })).toEqual("/1");
});

it('should replace :id with provided id in a path with file extension', () => {
  expect(route("/:id.pdf", { id: "test" })).toEqual("/test.pdf");
  expect(route("/:id.pdf", { id: 1 })).toEqual("/1.pdf");
});

it('should replace :id with provided id in a nested path', () => {
  expect(route("/test/:id", { id: "test" })).toEqual("/test/test");
  expect(route("/test/:id", { id: 1 })).toEqual("/test/1");
});

it('should replace :id with provided id in a nested path with file extension', () => {
  expect(route("/test/:id.pdf", { id: "test" })).toEqual("/test/test.pdf");
  expect(route("/test/:id.pdf", { id: 1 })).toEqual("/test/1.pdf");
});
