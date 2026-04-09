const fs = require("fs");
const path = require("path");
const os = require("os");

exports.run = (args) => {
  try {
    const [componentName, targetPath, optionsRaw] = args;

    const options = JSON.parse(optionsRaw || "{}");

    const ROOT = path.resolve(path.join(__dirname, "../../"));
    const TEMPLATE_DIR = path.join(ROOT, "tools/forge/templates/component");

    const pascalCase = (value) =>
      value
        .replace(/[-_ ]+/g, " ")
        .trim()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("");

    const name = pascalCase(componentName);

    const resolvedTarget = path.isAbsolute(targetPath)
      ? targetPath
      : path.join(ROOT, targetPath);

    const folderPath = options.folder
      ? path.join(resolvedTarget, name)
      : resolvedTarget;

    fs.mkdirSync(folderPath, { recursive: true });

    const render = (template, vars) =>
      template.replace(/{{(.*?)}}/g, (_, key) => vars[key.trim()] || "");

    const createFile = (tpl, output) => {
      const tplPath = path.join(TEMPLATE_DIR, tpl);

      if (!fs.existsSync(tplPath)) {
        throw new Error(`Template missing: ${tpl}`);
      }

      const outPath = path.join(folderPath, output);

      // Ne pas écraser si le fichier existe déjà
      if (fs.existsSync(outPath)) {
        console.log(`Skipped (already exists): ${outPath}`);
        return null;
      }

      const raw = fs.readFileSync(tplPath, "utf-8");
      const content = render(raw, {
        name,
        nameAllCaps: name.toUpperCase(),
        nameLower: name.toLowerCase(),
      });

      fs.writeFileSync(outPath, content);

      return outPath;
    };

    const created = [];

    created.push(createFile("component.tsx.tpl", `${name}.tsx`));

    if (options.types)
      created.push(createFile("types.ts.tpl", `${name}.types.ts`));

    if (options.style)
      created.push(createFile("style.css.tpl", `${name}.module.css`));

    if (options.showcase) {
      created.push(createFile("docs.ts.tpl", `${name}.docs.ts`));
      created.push(createFile("demo.tsx.tpl", `${name}.demo.tsx`));
    }

    if (options.barrel && !options.showcase)
      created.push(createFile("index.ts.tpl", `index.ts`));

    if (options.barrel && options.showcase)
      created.push(createFile("indexShowcase.ts.tpl", `index.ts`));

    if (options.docs) created.push(createFile("readme.md.tpl", `README.md`));

    const result = {
      success: true,
      files: created,
      count: created.length,
    };

    const outFile = path.join(os.tmpdir(), `action-${process.pid}.json`);
    fs.writeFileSync(outFile, JSON.stringify(result));
    console.log(`__OUTPUT_FILE__:${outFile}`);
  } catch (err) {
    const outFile = path.join(os.tmpdir(), `action-${process.pid}.json`);

    const result = {
      success: false,
      error: err.message,
      stack: err.stack,
    };

    fs.writeFileSync(outFile, JSON.stringify(result));
    console.log(`__OUTPUT_FILE__:${outFile}`);

    process.exit(1);
  }
};
