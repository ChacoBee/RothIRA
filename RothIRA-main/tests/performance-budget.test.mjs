import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distRoot = path.resolve(__dirname, '..', 'dist');
const MAX_ENTRY_JS_BYTES = 260 * 1024;
const FORBIDDEN_PATTERNS = [
  /d7g4oihr01qqb8ribc8gd7g4oihr01qqb8ribc90/i,
  /qPhDU6pPgXTmbdzSL7FxdxXUzQFELzW9/i,
];

async function listFiles(root) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(root, entry.name);
      if (entry.isDirectory()) {
        return listFiles(fullPath);
      }
      return [fullPath];
    })
  );
  return nested.flat();
}

function assertValue(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const files = await listFiles(distRoot);
const relativeFiles = files.map((file) => path.relative(distRoot, file).replace(/\\/g, '/'));
const sourceMaps = relativeFiles.filter((file) => file.endsWith('.map'));
const copiedChartVendor = relativeFiles.filter((file) => /(^|\/)js\/vendor\/chart\.umd\.min\.js/.test(file));
const entryJsFiles = relativeFiles.filter((file) => /^assets\/index-.*\.js$/.test(file));
const chartRuntimeChunks = relativeFiles.filter((file) => /^assets\/auto-.*\.js$/.test(file));
const distIndexHtml = await fs.readFile(path.join(distRoot, 'index.html'), 'utf8');

assertValue(sourceMaps.length === 0, `Production build should not ship source maps: ${sourceMaps.join(', ')}`);
assertValue(copiedChartVendor.length === 0, 'Production build should not copy duplicate Chart.js UMD vendor assets.');
assertValue(entryJsFiles.length > 0, 'Could not find the Vite entry JavaScript bundle.');
assertValue(chartRuntimeChunks.length === 1, 'Chart.js runtime should be split into one dynamic chunk.');
assertValue(
  relativeFiles.includes('legacy-index.static.html'),
  'Production build should ship legacy markup as a separate static asset.'
);
assertValue(
  !distIndexHtml.includes('./js/data.js') && !distIndexHtml.includes('./js/app.js'),
  'Production index should not eagerly include legacy runtime scripts.'
);
assertValue(
  !distIndexHtml.includes('./config.js'),
  'Production index should not eagerly include runtime config; bootstrap loads it before legacy scripts.'
);

for (const relativeFile of entryJsFiles) {
  const stat = await fs.stat(path.join(distRoot, relativeFile));
  assertValue(
    stat.size <= MAX_ENTRY_JS_BYTES,
    `${relativeFile} is ${stat.size} bytes, above the ${MAX_ENTRY_JS_BYTES} byte entry budget.`
  );
}

for (const file of files.filter((candidate) => /\.(html|js|css|json)$/i.test(candidate))) {
  const content = await fs.readFile(file, 'utf8');
  const relativeFile = path.relative(distRoot, file).replace(/\\/g, '/');
  for (const pattern of FORBIDDEN_PATTERNS) {
    assertValue(!pattern.test(content), `Forbidden committed API key pattern found in ${relativeFile}.`);
  }
}

console.log('Performance/security budget checks passed.');
