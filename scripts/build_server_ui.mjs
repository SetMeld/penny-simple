#!/usr/bin/env zx
import "zx/globals";

const unneededPages = [
  "src/pages/index.tsx",
  "src/pages/explore.tsx",
];
await Promise.all(
  unneededPages.map(async (page) => {
    await fs.move(page, `scripts/.cache/${page}`, { overwrite: true });
  })
);
await fs.move("src/pages/server_ui.tsx", "src/pages/[[...slug]].tsx", {
  overwrite: true,
});

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
  await fs.move("src/pages/[[...slug]].tsx", "src/pages/server_ui.tsx");
}

process.on("SIGINT", async () => {
  await restore();
});

let exitCode = 0;
let error = "";

try {
  await $`NEXT_PUBLIC_MODE="integrate" npm run build`;

  await fs.remove("server-ui");
  await fs.move("out", "server-ui");
  await fs.move("server-ui/[[...slug]]/index.html", "server-ui/index.html");
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
