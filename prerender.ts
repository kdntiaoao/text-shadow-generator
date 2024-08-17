import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, p);

const templateHtml = fs.readFileSync("./dist/static/index.html", "utf-8");

const render = (await import("./dist/server/entry-server.js")).render;

const rendered = render();

const html = templateHtml
  .replace(`<!--app-head-->`, rendered.head ?? "")
  .replace(`<!--app-html-->`, rendered.html ?? "");

fs.writeFileSync(toAbsolute(`dist/static/index.html`), html);
