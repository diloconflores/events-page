import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "src/i18n/config.ts");
const i18nDir = path.join(rootDir, "src/i18n");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fail(message) {
  console.error(`[validate:i18n] ${message}`);
  process.exitCode = 1;
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function extractLocales(configSource) {
  const locales = [...configSource.matchAll(/code:\s*"([a-z-]+)"/g)].map((match) => match[1]);
  return [...new Set(locales)];
}

function compareShape(reference, candidate, currentPath = "") {
  const referenceIsArray = Array.isArray(reference);
  const candidateIsArray = Array.isArray(candidate);

  if (referenceIsArray || candidateIsArray) {
    assert(referenceIsArray === candidateIsArray, `Type mismatch at ${currentPath || "<root>"}`);
    assert(reference.length === candidate.length, `Array length mismatch at ${currentPath || "<root>"}`);
    for (let index = 0; index < reference.length; index += 1) {
      compareShape(reference[index], candidate[index], `${currentPath}[${index}]`);
    }
    return;
  }

  const referenceIsObject = reference !== null && typeof reference === "object";
  const candidateIsObject = candidate !== null && typeof candidate === "object";

  if (!referenceIsObject || !candidateIsObject) {
    assert(typeof reference === typeof candidate, `Value type mismatch at ${currentPath || "<root>"}`);
    return;
  }

  const referenceKeys = Object.keys(reference).sort();
  const candidateKeys = Object.keys(candidate).sort();

  assert(
    JSON.stringify(referenceKeys) === JSON.stringify(candidateKeys),
    `Key mismatch at ${currentPath || "<root>"}: expected [${referenceKeys.join(", ")}], got [${candidateKeys.join(", ")}]`,
  );

  for (const key of referenceKeys) {
    compareShape(reference[key], candidate[key], currentPath ? `${currentPath}.${key}` : key);
  }
}

function findLocaleJsonGroups(directory) {
  const results = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    const localeFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));

    if (localeFiles.length > 0) {
      results.push(currentDir);
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(currentDir, entry.name));
      }
    }
  }

  walk(directory);
  return results;
}

const configSource = fs.readFileSync(configPath, "utf8");
const locales = extractLocales(configSource);

assert(locales.length > 0, "No locales found in src/i18n/config.ts");

const groupedDirs = findLocaleJsonGroups(i18nDir).filter((directory) => {
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
  return files.some((file) => locales.includes(path.basename(file, ".json")));
});

for (const directory of groupedDirs) {
  const files = new Map(
    fs
      .readdirSync(directory)
      .filter((file) => file.endsWith(".json"))
      .map((file) => [path.basename(file, ".json"), path.join(directory, file)]),
  );

  const expectedFiles = [...locales].sort();
  const presentFiles = [...files.keys()].sort();

  assert(
    JSON.stringify(expectedFiles) === JSON.stringify(presentFiles),
    `Locale file mismatch in ${path.relative(rootDir, directory)}: expected [${expectedFiles.join(", ")}], got [${presentFiles.join(", ")}]`,
  );

  const reference = readJson(files.get(locales[0]));
  for (const locale of locales.slice(1)) {
    const candidate = readJson(files.get(locale));
    compareShape(reference, candidate, path.relative(rootDir, directory));
  }
}

console.log(`[validate:i18n] OK (${locales.join(", ")})`);
