const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
}

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

const spacingPrefixes = [
  'w', 'h', 'max-w', 'max-h', 'min-w', 'min-h',
  'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py',
  'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my',
  'gap', 'gap-x', 'gap-y',
  'top', 'bottom', 'left', 'right', 'inset', 'inset-x', 'inset-y',
  'rounded', 'rounded-t', 'rounded-b', 'rounded-l', 'rounded-r', 'rounded-tl', 'rounded-tr', 'rounded-bl', 'rounded-br'
];

// Regex for [Xrem]
const remRegex = new RegExp(`(^|\\s|:|>|\\\\\`|'|")(${spacingPrefixes.join('|')})-\\[([0-9.]+)rem\\]`, 'g');
// Regex for [Xpx]
const pxRegex = new RegExp(`(^|\\s|:|>|\\\\\`|'|")(${spacingPrefixes.join('|')})-\\[([0-9.]+)px\\]`, 'g');

let totalReplacements = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace rem
  let newContent = content.replace(remRegex, (match, before, prefix, numStr) => {
    const num = parseFloat(numStr);
    const spacingValue = num * 4;
    if (Number.isFinite(spacingValue) && Number.isInteger(spacingValue * 4)) {
      totalReplacements++;
      return `${before}${prefix}-${spacingValue}`;
    }
    return match;
  });

  // Replace px
  newContent = newContent.replace(pxRegex, (match, before, prefix, numStr) => {
    const num = parseFloat(numStr);
    // 4px = 1 spacing unit (since 1 unit = 0.25rem = 4px)
    const spacingValue = num / 4;
    // Only replace if it exactly matches the grid (e.g. integer or .5)
    // Actually in v4, spacing can be decimals. But usually we only replace if it's a nice number.
    if (Number.isFinite(spacingValue) && Number.isInteger(spacingValue * 4)) {
      totalReplacements++;
      return `${before}${prefix}-${spacingValue}`;
    }
    return match;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
});

console.log(`Total replacements this run: ${totalReplacements}`);
