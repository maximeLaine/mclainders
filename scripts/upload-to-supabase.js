const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://athggjqkjojtrykdocel.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'assets';
const PUBLIC_DIR = path.join(__dirname, '../public');

if (!SERVICE_ROLE_KEY) {
  console.error('SUPABASE_SERVICE_ROLE_KEY env var required');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
};

// Normalize filenames: spaces → hyphens
function normalizeName(name) {
  return name.replace(/ /g, '-');
}

function collectFiles(dir, prefix) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, `${prefix}/${normalizeName(entry.name)}`));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (MIME_TYPES[ext]) {
        results.push({
          localPath: fullPath,
          storagePath: `${prefix}/${normalizeName(entry.name)}`,
          contentType: MIME_TYPES[ext],
        });
      }
    }
  }
  return results;
}

async function upload(file) {
  const data = fs.readFileSync(file.localPath);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(file.storagePath, data, {
      contentType: file.contentType,
      upsert: true,
    });
  if (error) throw new Error(`${file.storagePath}: ${error.message}`);
  console.log(`✓ ${file.storagePath}`);
}

async function main() {
  const files = [
    ...collectFiles(path.join(PUBLIC_DIR, 'gallery'), 'gallery'),
    ...collectFiles(path.join(PUBLIC_DIR, 'liste'), 'liste'),
  ];

  // logo
  const logoPath = path.join(PUBLIC_DIR, 'logo.png');
  if (fs.existsSync(logoPath)) {
    files.push({ localPath: logoPath, storagePath: 'logo.png', contentType: 'image/png' });
  }

  console.log(`Uploading ${files.length} files to Supabase Storage bucket "${BUCKET}"...`);

  let ok = 0;
  let fail = 0;
  for (const file of files) {
    try {
      await upload(file);
      ok++;
    } catch (err) {
      console.error(`✗ ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} uploaded, ${fail} failed`);
}

main();
