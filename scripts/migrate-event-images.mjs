import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceRoot = "/Users/raymundo.salazar/Desktop/Dilo con Flores/Eventos fotos";
const compressedRoot = path.join(sourceRoot, "iloveimg-compressed");
const publicRoot = path.join(rootDir, "public", "eventos");
const thumbnailRoot = path.join(publicRoot, "thumbs");
const landingDir = path.join(rootDir, "src", "i18n", "translations", "landing");
const targetSizeKb = 200;

const fullAttempts = [
  { width: 1280, height: 1600, quality: 82 },
  { width: 1280, height: 1600, quality: 76 },
  { width: 1280, height: 1600, quality: 70 },
  { width: 1120, height: 1400, quality: 82 },
  { width: 1120, height: 1400, quality: 76 },
  { width: 1120, height: 1400, quality: 70 },
  { width: 960, height: 1200, quality: 82 },
  { width: 960, height: 1200, quality: 76 },
  { width: 960, height: 1200, quality: 70 },
];

const thumbnailAttempts = [
  { width: 400, height: 400, quality: 82 },
  { width: 400, height: 400, quality: 76 },
  { width: 400, height: 400, quality: 70 },
];

function fail(message) {
  throw new Error(`[migrate-event-images] ${message}`);
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function isRemoteEventImage(value) {
  return typeof value === "string" && value.includes("cdn0.bodas.com.mx/vendor/3162/");
}

function extractImageId(remoteUrl) {
  const match = remoteUrl.match(/img-([0-9]+)_/i);
  if (!match) {
    fail(`Unable to extract image id from ${remoteUrl}`);
  }

  return match[1];
}

function toLocalFileName(imageId) {
  return `img_${imageId}.webp`;
}

function toThumbnailFileName(imageId) {
  return `img_${imageId}.webp`;
}

function findSourceFile(imageId) {
  const candidates = [
    path.join(compressedRoot, `IMG_${imageId}.png`),
    path.join(compressedRoot, `IMG_${imageId}.jpg`),
    path.join(compressedRoot, `IMG_${imageId}.jpeg`),
    path.join(compressedRoot, `IMG_${imageId}.webp`),
    path.join(sourceRoot, `IMG_${imageId}.png`),
    path.join(sourceRoot, `IMG_${imageId}.jpg`),
    path.join(sourceRoot, `IMG_${imageId}.jpeg`),
    path.join(sourceRoot, `IMG_${imageId}.webp`),
  ];

  const sourceFile = candidates.find((candidate) => fs.existsSync(candidate));

  if (!sourceFile) {
    fail(`Missing source image for ${imageId}`);
  }

  return sourceFile;
}

async function generateImage(sourceFile, destinationFile, options) {
  ensureDirectory(path.dirname(destinationFile));

  return sharp(sourceFile)
    .rotate()
    .resize({
      width: options.width,
      height: options.height,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: options.quality,
      effort: 4,
    })
    .toFile(destinationFile);
}

async function generateBestImage(sourceFile, destinationFile, attempts, sizeLimitKb) {
  let bestResult = null;

  for (const attempt of attempts) {
    const result = await generateImage(sourceFile, destinationFile, attempt);
    const sizeKb = fs.statSync(destinationFile).size / 1024;
    const generatedResult = {
      ...attempt,
      sizeKb,
      width: result.width,
      height: result.height,
    };

    if (!bestResult || sizeKb < bestResult.sizeKb) {
      bestResult = generatedResult;
    }

    if (sizeKb <= sizeLimitKb) {
      return generatedResult;
    }
  }

  if (!bestResult) {
    fail(`Unable to generate ${destinationFile}`);
  }

  const result = await generateImage(sourceFile, destinationFile, bestResult);
  const sizeKb = fs.statSync(destinationFile).size / 1024;
  return {
    ...bestResult,
    sizeKb,
    width: result.width,
    height: result.height,
  };
}

function updateMediaNode(node, imageDimensions) {
  if (Array.isArray(node)) {
    return node.map((item) => updateMediaNode(item, imageDimensions));
  }

  if (!node || typeof node !== "object") {
    return node;
  }

  const updated = {};
  for (const [key, value] of Object.entries(node)) {
    if (key === "src" && isRemoteEventImage(value)) {
      const imageId = extractImageId(value);
      const localFile = `/eventos/${toLocalFileName(imageId)}`;
      updated[key] = localFile;
      if (typeof node.title === "string" && typeof node.subtitle === "string") {
        const imageMeta = imageDimensions.get(imageId);
        if (!imageMeta) {
          fail(`Missing generated metadata for ${imageId}`);
        }

        updated.thumbnail = imageMeta.thumbnail;
        updated.width = imageMeta.width;
        updated.height = imageMeta.height;
      }
      continue;
    }

    updated[key] = updateMediaNode(value, imageDimensions);
  }

  return updated;
}

async function main() {
  ensureDirectory(publicRoot);
  ensureDirectory(thumbnailRoot);

  const imageIds = new Set();
  const landingFiles = fs
    .readdirSync(landingDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(landingDir, file));

  const landingDocuments = landingFiles.map((filePath) => {
    const document = readJson(filePath);
    const collectIds = (value) => {
      if (!value || typeof value !== "object") {
        return;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          collectIds(item);
        }
        return;
      }

      if (typeof value.src === "string" && isRemoteEventImage(value.src)) {
        imageIds.add(extractImageId(value.src));
      }

      for (const child of Object.values(value)) {
        collectIds(child);
      }
    };

    collectIds(document);

    return { filePath, document };
  });

  const imageDimensions = new Map();
  const processedImages = [];

  for (const imageId of [...imageIds].sort()) {
    const sourceFile = findSourceFile(imageId);
    const fullDestination = path.join(publicRoot, toLocalFileName(imageId));
    const thumbnailDestination = path.join(thumbnailRoot, toThumbnailFileName(imageId));

    const fullResult = await generateBestImage(sourceFile, fullDestination, fullAttempts, targetSizeKb);
    const thumbnailResult = await generateBestImage(sourceFile, thumbnailDestination, thumbnailAttempts, targetSizeKb);
    imageDimensions.set(imageId, {
      thumbnail: `/eventos/thumbs/${toThumbnailFileName(imageId)}`,
      width: thumbnailResult.width,
      height: thumbnailResult.height,
    });

    processedImages.push({
      imageId,
      sourceFile: path.relative(rootDir, sourceFile),
      fullDestination: path.relative(rootDir, fullDestination),
      fullSizeKb: fullResult.sizeKb.toFixed(1),
      thumbnailDestination: path.relative(rootDir, thumbnailDestination),
      thumbnailSizeKb: thumbnailResult.sizeKb.toFixed(1),
    });
  }

  for (const landingDocument of landingDocuments) {
    writeJson(landingDocument.filePath, updateMediaNode(landingDocument.document, imageDimensions));
  }

  console.log(
    `[migrate-event-images] processed ${processedImages.length} images and updated ${landingDocuments.length} locale files`,
  );
  for (const image of processedImages) {
    console.log(
      `[migrate-event-images] ${image.imageId}: ${image.fullDestination} (${image.fullSizeKb} KB), ${image.thumbnailDestination} (${image.thumbnailSizeKb} KB)`,
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
