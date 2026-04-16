import legacyDocumentHtml from '../../legacy-index.static.html?raw';

const FALLBACK_BODY_CLASS = 'transition-colors duration-300';
const SECTION_6_NEWS_SLOT = `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div id="worldStockNewsMount" class="xl:col-span-2"></div>
        </div>
`;
const SECTION_6_ID_MARKER = '<section id="advanced-tracker"';
const SECTION_6_TOP_GRID_MARKER = '<div class="grid grid-cols-1 gap-6 mb-6">';
const SECTION_6_REST_MARKER = `<div
          class="mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"`;

function normalizeLineEndings(value) {
  return value.replace(/\r\n/g, '\n');
}

function extractBodyAttributes(html) {
  const match = html.match(/<body([^>]*)>/i);
  return match ? match[1] : '';
}

function extractBodyInnerHtml(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? normalizeLineEndings(match[1]) : '';
}

function stripBodyScripts(bodyHtml) {
  return bodyHtml.replace(/\s*<script\b[^>]*><\/script>/gi, '');
}

function replaceSection6TopGrid(bodyHtml) {
  const sectionStart = bodyHtml.indexOf(SECTION_6_ID_MARKER);
  if (sectionStart === -1) {
    return bodyHtml;
  }

  const gridStart = bodyHtml.indexOf(SECTION_6_TOP_GRID_MARKER, sectionStart);
  const gridEnd = bodyHtml.indexOf(SECTION_6_REST_MARKER, gridStart);

  if (gridStart === -1 || gridEnd === -1) {
    return bodyHtml;
  }

  return `${bodyHtml.slice(0, gridStart)}${SECTION_6_NEWS_SLOT}${bodyHtml.slice(gridEnd)}`;
}

const bodyAttributes = extractBodyAttributes(legacyDocumentHtml);
const bodyClassMatch = bodyAttributes.match(/class="([^"]+)"/i);
export const legacyBodyClass = bodyClassMatch?.[1] || FALLBACK_BODY_CLASS;

const bodyMarkup = extractBodyInnerHtml(legacyDocumentHtml);
export const legacyAppMarkup = replaceSection6TopGrid(stripBodyScripts(bodyMarkup)).trim();