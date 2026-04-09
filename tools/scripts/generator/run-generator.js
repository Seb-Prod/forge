#!/usr/bin/env node

const path = require("path");

const generatorType = process.argv[2];
const args = process.argv.slice(3);

if (!generatorType) {
  console.error("Generator type missing");
  process.exit(1);
}

const generatorPath = path.join(
  __dirname,
  "../../generators",
  `${generatorType}.generator.js`
);

try {
  const generator = require(generatorPath);
  generator.run(args);
} catch (err) {
  console.error("Generator not found:", generatorType);
  process.exit(1);
}