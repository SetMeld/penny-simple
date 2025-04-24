import { test, expect } from "@playwright/test";
import { strToU8, unzip, Unzipped } from "fflate";
import { readFile, writeFile } from "node:fs/promises";
import path, { resolve } from "node:path";

test("browsing a Resource", async ({ page }) => {
  await page.goto("/container/malicious.ttl");

  const headings = await page.getByRole("heading");

  await expect(headings).toHaveCount(6);

  const pageTitle = await headings.nth(0);
  await expect(pageTitle).toHaveText("Penny");

  const locationBar = await headings.nth(1);
  await expect(locationBar).toContainText(
    "localhost:3000/container/malicious.ttl",
  );

  const thingsHeading = await headings.nth(2);
  await expect(thingsHeading).toHaveText("Things");

  const thing1 = await headings.nth(3);
  await expect(thing1).toHaveText("malicious.ttl");

  const thing2 = await headings.nth(4);
  await expect(thing2).toHaveText("foo:javascript:alert(1)");

  const dangerZoneHeading = await headings.nth(5);
  await expect(dangerZoneHeading).toHaveText("Danger Zone");

  const parentContainerLink = await page
    .getByRole("link", { name: "container" })
    .first();
  await parentContainerLink.click();

  const containedResourceLink = await page.getByRole("link", {
    name: "/malicious.ttl",
  });
  await expect(containedResourceLink).toBeVisible();
});

test("deleting a Resource that pretends to contain another Resource", async ({
  page,
}) => {
  async function createMaliciousFile(): Promise<string> {
    const random = Math.random().toString();
    await writeFile(
      resolve(
        __dirname,
        `./community-solid-server/mock-pod/del/malicious${random}.ttl`,
      ),
      `
      @prefix ldp: <http://www.w3.org/ns/ldp#>.
      @prefix me: <>.
      me:
          a ldp:BasicContainer, ldp:Container;
          ldp:contains <./dont-delete-me.ttl>.
      `,
    );
    return `malicious${random}.ttl`;
  }
  const fileName = await createMaliciousFile();
  await page.goto(`/del/${fileName}`);

  const deleteButton = await page.getByRole("button", {
    name: "Delete resource",
  });
  await deleteButton.click();

  const confirmationInput = await page.getByRole("textbox");
  await confirmationInput.type(fileName);
  await confirmationInput.press("Enter");

  await page.goto("/del/dont-delete-me.ttl");

  // Finding this message means that the file did not get delete,
  // and hence that a previous recursive deletion vulnerability did not
  // reoccur:
  const emptyResourceNotice = await page.getByText("This resource is empty.");
  await expect(emptyResourceNotice).toBeVisible();
});

test("zipping a container", async ({ page }) => {
  await page.goto("/zippy/");

  await page.getByRole("button", { name: "Download all" }).click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Save ⁨zippy.zip⁩" }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("zippy.zip");

  // get content of downloaded file
  const zipPath = path.join(
    "e2e",
    "test-artifacts",
    download.suggestedFilename(),
  );
  await download.saveAs(zipPath);
  const file = await readFile(zipPath);

  // verify that the zip contains the files from the zippy/ container
  const downloadedZip = await new Promise<Unzipped>((resolve, reject) => {
    unzip(file as unknown as Parameters<typeof unzip>[0], {}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  const expectedPaths = [
    "meta.json",
    "zippy/root.txt",
    "zippy/root.txt.meta",
    "zippy/foo/",
    "zippy/foo/.meta",
    "zippy/foo/book.ttl",
    "zippy/foo/book.ttl.meta",
  ];
  const actualPaths = Object.keys(downloadedZip);
  expect(actualPaths).toEqual(expect.arrayContaining(expectedPaths));
  expect(expectedPaths).toEqual(expect.arrayContaining(actualPaths));
  expect(downloadedZip["zippy/root.txt"]).toEqual(
    strToU8("Hello from the root!"),
  );
  expect(downloadedZip["zippy/foo/book.ttl"]).toEqual(
    strToU8(
      "<http://example.org/books/Huckleberry_Finn> <http://example.org/relation/author> <http://example.org/person/Mark_Twain> .",
    ),
  );
});
