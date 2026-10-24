import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname, sep } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
};
const port = Number(process.env.PORT || 3000);
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const file = resolve(
      root,
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    const relative = file.slice(root.length);
    const isPublic =
      ["index.html", "app.js", "styles.css"].includes(relative) ||
      relative.startsWith(`src${sep}`);
    if (!file.startsWith(root) || !isPublic) {
      response.writeHead(404).end("Not found");
      return;
    }
    const content = await readFile(file);
    response.writeHead(200, {
      "Content-Type": `${types[extname(file)] || "application/octet-stream"}; charset=utf-8`,
    });
    response.end(content);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`ARQ.LAB: http://localhost:${port}`),
);
