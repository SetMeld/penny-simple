#!/usr/bin/env zx
import "zx/globals";

const unneededPages = ["src/pages/server_ui.tsx"];
await Promise.all(
  unneededPages.map(async (page) => {
    await fs.move(page, `scripts/.cache/${page}`, { overwrite: true });
  })
);

let restoreStarted = false;
async function restore() {
  if (restoreStarted) {
    return;
  }
  restoreStarted = true;

  await Promise.all(
    unneededPages.map((page) =>
      fs.move(`scripts/.cache/${page}`, page, { overwrite: true })
    )
  );
}

process.on("SIGINT", async () => {
  await restore();
});

let exitCode = 0;
let error = "";

try {
  await $`npm run build`;
} catch (processOutput) {
  /** @type {ProcessOutput} */
  const output = processOutput;
  exitCode = output.exitCode;
  error = output.error;
}

await restore();

if (exitCode !== 0) {
  console.error(error);
  process.exit(exitCode);
}
