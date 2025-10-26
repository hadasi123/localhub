// Simple helper to check if REACT_APP_FIREBASE_* env vars are defined in .env.local
// Run with: node scripts/check-firebase-config.js

const fs = require('fs');
const path = require('path');

function parseEnvFile(content) {
  const lines = content.split(/\r?\n/);
  const vars = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    vars[key] = val;
  }
  return vars;
}

const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local not found at project root. Create it from .env.local.example and fill values.');
  process.exit(2);
}

const content = fs.readFileSync(envPath, 'utf8');
const vars = parseEnvFile(content);
const required = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missing = required.filter(k => !vars[k] || vars[k].length === 0);
if (missing.length === 0) {
  console.log('All required REACT_APP_FIREBASE_* keys are present in .env.local.');
  console.log('Project ID:', vars.REACT_APP_FIREBASE_PROJECT_ID);
  process.exit(0);
} else {
  console.error('Missing the following required keys in .env.local:');
  missing.forEach(m => console.error('- ' + m));
  process.exit(1);
}
