#!/usr/bin/env node

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDFJS_VERSION = "3.11.174";
const BASE_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js";
const OUTPUT_DIR = path.join(__dirname, "..", "public", "libs");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`)
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${path.basename(outputPath)}`);
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(outputPath, () => {}); // Delete the file on error
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function downloadPDFJS() {
  try {
    console.log(`Downloading PDF.js v${PDFJS_VERSION}...`);

    const files = [
      {
        url: `${BASE_URL}/${PDFJS_VERSION}/pdf.min.js`,
        path: path.join(OUTPUT_DIR, "pdf.min.js"),
      },
      {
        url: `${BASE_URL}/${PDFJS_VERSION}/pdf.worker.min.js`,
        path: path.join(OUTPUT_DIR, "pdf.worker.min.js"),
      },
    ];

    for (const file of files) {
      await downloadFile(file.url, file.path);
    }

    console.log("PDF.js files downloaded successfully!");
  } catch (error) {
    console.error("Error downloading PDF.js:", error.message);
    process.exit(1);
  }
}

downloadPDFJS();
