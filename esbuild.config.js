const esbuild = require("esbuild");
const path = require("path");
const { sassPlugin } = require("esbuild-sass-plugin");

const watch = process.argv.includes("--watch");

const options = {
  entryPoints: [path.join(__dirname, "src", "index.jsx")],
  bundle: true,
  outfile: path.join(__dirname, "dist", "renderer.js"),
  jsx: "automatic",
  loader: {
    ".js": "jsx",
    ".svg": "dataurl",
    ".webp": "dataurl",
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".jpeg": "dataurl",
  },
  target: "chrome120",
  sourcemap: true,
  logLevel: "info",
  plugins: [sassPlugin()],
};

async function run() {
  if (watch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log("esbuild watching for changes...");
  } else {
    await esbuild.build(options);
  }
}

run().catch(() => process.exit(1));
