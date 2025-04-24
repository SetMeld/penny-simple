import { test, expect } from "@playwright/test";

test("browsing a Resource", async ({ page }) => {
  await page.goto(
    "/explore/?url=https%3A%2F%2Fpenny-e2e.solidcommunity.net%2Fprofile%2Fcard"
  );

  const headings = await page.getByRole("heading");

  await expect(headings).toHaveCount(5);

  const pageTitle = await headings.nth(0);
  await expect(pageTitle).toHaveText("Penny");

  const locationBar = await headings.nth(1);
  await expect(locationBar).toContainText(
    "penny-e2e.solidcommunity.net/profile/card"
  );

  const thingsHeading = await headings.nth(2);
  await expect(thingsHeading).toHaveText("Things");

  const thing1 = await headings.nth(3);
  await expect(thing1).toHaveText("card");

  const thing2 = await headings.nth(4);
  await expect(thing2).toHaveText("card#me");

  const nameOnWebIdThing = await page
    .getByRole("listitem")
    .filter({ hasText: "Penny static account for end-to-end tests" });
  await expect(nameOnWebIdThing).toBeVisible();

  const locationBarEditToggle = await locationBar.getByRole("button", {
    name: "Change Resource URL",
  });
  await locationBarEditToggle.click();

  const locationInput = await page.getByPlaceholder("https://");
  await locationInput.fill("https://penny-e2e.solidcommunity.net/public/");
  await locationInput.press("Enter");

  const containedContainerLink = await page.getByRole("link", {
    name: "/child-container/",
  });
  await expect(containedContainerLink).toBeVisible();

  const containedResourceLink = await page.getByRole("link", {
    name: "/child-resource",
  });
  await expect(containedResourceLink).toBeVisible();
});
