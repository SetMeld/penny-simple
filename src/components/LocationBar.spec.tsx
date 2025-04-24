import { describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { LocationBar } from "./LocationBar";

describe("LocationBar", () => {
  function getDisplayedLocation(container: HTMLElement): string | undefined {
    // A link to the parent is displayed on small screens, but hidden on larger ones:
    return container.textContent?.replace(/^\.\./, "");
  }

  it("properly renders the origin", () => {
    const { container } = render(
      <LocationBar location="https://some-origin.example" onEdit={jest.fn()} />,
    );

    expect(getDisplayedLocation(container)).toBe("some-origin.example");
  });

  it("renders the port of the origin", () => {
    const { container } = render(
      <LocationBar
        location="https://some-origin.example:42"
        onEdit={jest.fn()}
      />,
    );

    expect(getDisplayedLocation(container)).toBe("some-origin.example:42");
  });

  it("appends a trailing slash when viewing a Container", () => {
    const { container } = render(
      <LocationBar location="https://some.pod/container/" onEdit={jest.fn()} />,
    );

    expect(getDisplayedLocation(container)).toBe("some.pod/container/");
  });

  it("appends a trailing slash and displays the query param when viewing a Container with a query param", () => {
    const { container } = render(
      <LocationBar
        location="https://some.pod/container/?ext=acr"
        onEdit={jest.fn()}
      />,
    );

    expect(getDisplayedLocation(container)).toBe("some.pod/container/?ext=acr");
  });

  it("properly displays a Resource URL", () => {
    const { container } = render(
      <LocationBar location="https://some.pod/resource" onEdit={jest.fn()} />,
    );

    expect(getDisplayedLocation(container)).toBe("some.pod/resource");
  });

  it("appends displays the query param when viewing a Resource with a query param", () => {
    const { container } = render(
      <LocationBar
        location="https://some.pod/resource?ext=acr"
        onEdit={jest.fn()}
      />,
    );

    expect(getDisplayedLocation(container)).toBe("some.pod/resource?ext=acr");
  });

  it("renders the port of the origin when viewing a non-root Resource", () => {
    const { container } = render(
      <LocationBar
        location="https://some.pod:1337/resource?ext=acr"
        onEdit={jest.fn()}
      />,
    );

    expect(getDisplayedLocation(container)).toBe(
      "some.pod:1337/resource?ext=acr",
    );
  });

  it("includes links to the Resource's Containers", () => {
    const { getAllByRole } = render(
      <LocationBar
        location="https://some.pod/container/resource"
        onEdit={jest.fn()}
      />,
    );

    const links = getAllByRole("link");
    const linkTargets = links.map((link) => link.getAttribute("href"));
    expect(linkTargets).toStrictEqual([
      "/explore?url=" + encodeURIComponent("https://some.pod"),
      "/explore?url=" + encodeURIComponent("https://some.pod/container/"),
    ]);
  });

  it("renders a readable version of special characters", () => {
    const { container } = render(
      <LocationBar
        location="https://some.pod/resource%20with%20spaces"
        onEdit={jest.fn()}
      />,
    );

    expect(getDisplayedLocation(container)).toBe(
      "some.pod/resource with spaces",
    );
  });
});
