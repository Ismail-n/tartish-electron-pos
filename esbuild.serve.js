const esbuild = require("esbuild");
const path = require("path");
const { sassPlugin } = require("esbuild-sass-plugin");

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
    ".woff": "file",
    ".woff2": "file",
    ".ttf": "file",
  },
  target: "chrome120",
  sourcemap: true,
  logLevel: "info",
  plugins: [sassPlugin()],
};

async function run() {
  const ctx = await esbuild.context(options);
  await ctx.watch();

  const { host, port } = await ctx.serve({
    servedir: __dirname,
    port: 5173,
  });

  console.log(`Dev server running at http://${host === "0.0.0.0" ? "localhost" : host}:${port}`);
}

run().catch(() => process.exit(1));
