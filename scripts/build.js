import { cp, mkdir, rm } from "node:fs/promises";

// Only public assets belong in the deployment artifact.
await rm(new URL("../dist/", import.meta.url), {
  recursive: true,
  force: true,
});
await mkdir(new URL("../dist/", import.meta.url));
for (const asset of ["index.html", "styles.css", "app.js", "src"]) {
  await cp(
    new URL(`../${asset}`, import.meta.url),
    new URL(`../dist/${asset}`, import.meta.url),
    { recursive: true },
  );
}
console.log("Site estático gerado em dist/.");
