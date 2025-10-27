import { createServer } from "http";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const HOST = "127.0.0.1";

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".json":
      return "application/json";
    case ".csv":
      return "text/csv";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    default:
      return "application/octet-stream";
  }
}

function resolveFilePath(requestPath) {
  const safePath = decodeURIComponent(requestPath.split("?")[0]);
  const relativeSafePath = safePath.replace(/^\/+/, "");
  const requested = path.join(projectRoot, relativeSafePath);
  if (!requested.startsWith(projectRoot)) {
    return null;
  }
  return requested;
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const { url, method } = req;
        if (method !== "GET" && method !== "HEAD") {
          res.writeHead(405);
          res.end();
          return;
        }

        const urlPath = url === "/" ? "/index.html" : url;
        let filePath = resolveFilePath(urlPath);

        if (!filePath) {
          res.writeHead(403);
          res.end("Forbidden");
          return;
        }

        const stats = await fs.stat(filePath).catch(() => null);
        if (!stats) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }

        if (stats.isDirectory()) {
          filePath = path.join(filePath, "index.html");
        }

        const data = await fs.readFile(filePath);
        res.writeHead(200, {
          "Content-Type": getContentType(filePath),
        });
        res.end(data);
      } catch (error) {
        res.writeHead(500);
        res.end("Internal server error");
      }
    });

    server.on("error", reject);
    server.listen(0, HOST, () => {
      const address = server.address();
      if (!address || typeof address !== "object") {
        reject(new Error("Unable to determine server port"));
        return;
      }
      resolve({ server, port: address.port });
    });
  });
}

async function runConsoleAudit() {
  const { server, port } = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];

  page.on("console", (message) => {
    const entry = {
      type: message.type(),
      text: message.text(),
      location: message.location(),
    };
    if (message.type() === "error") {
      consoleErrors.push(entry);
    } else if (message.type() === "warning") {
      consoleWarnings.push(entry);
    }
  });

  page.on("pageerror", (error) => {
    consoleErrors.push({
      type: "pageerror",
      text: error.message,
      stack: error.stack,
    });
  });

  const targetUrl = `http://${HOST}:${port}/index.html`;
  try {
    await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((resolve) => setTimeout(resolve, 12000));
  } finally {
    await browser.close();
    server.close();
  }

  return { consoleErrors, consoleWarnings };
}

runConsoleAudit()
  .then(({ consoleErrors, consoleWarnings }) => {
    if (consoleWarnings.length) {
      console.log("Warnings detected:");
      consoleWarnings.forEach((warning, index) => {
        const location = warning.location?.url
          ? `${warning.location.url}:${warning.location.lineNumber || 0}`
          : "<unknown>";
        console.log(`  [${index + 1}] ${warning.text} @ ${location}`);
      });
    }

    if (consoleErrors.length) {
      console.error("Errors detected:");
      consoleErrors.forEach((error, index) => {
        const location = error.location?.url
          ? `${error.location.url}:${error.location.lineNumber || 0}`
          : "<unknown>";
        console.error(`  [${index + 1}] ${error.text} @ ${location}`);
        if (error.stack) {
          console.error(error.stack);
        }
      });
      process.exitCode = 1;
    } else {
      console.log("No console errors detected.");
    }
  })
  .catch((error) => {
    console.error("Console audit failed:", error);
    process.exitCode = 1;
  });
