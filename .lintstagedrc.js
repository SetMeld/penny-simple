module.exports = {
  "*.{ts,tsx,js,jsx}": (filenames) =>
    `next lint --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(" --file ")}`,
  "*.{ts,tsx,js,jsx,css,md}": "prettier --write",
};
