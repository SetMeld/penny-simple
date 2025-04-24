import { describe, it } from "@jest/globals";
import { getExplorePath } from "./integrate";

describe("In integrated mode", () => {
  const initialMode = process.env.NEXT_PUBLIC_MODE;

  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_MODE = "integrate";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_MODE = initialMode;
  });

  describe("getExplorePath", () => {
    it("URL-encodes filenames that pretend to be a URL with a non-HTTPS protocol", async () => {
      expect(getExplorePath("foo:javascript:alert(1)")).toBe(
        "javascript%3Aalert(1)",
      );
    });

    it("preserves HTTPS links", async () => {
      expect(getExplorePath("https://my.pod/some-container/")).toBe(
        "/some-container/",
      );
    });
  });
});
