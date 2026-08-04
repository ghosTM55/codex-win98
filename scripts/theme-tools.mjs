import { access, mkdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));
export const manifestPath = path.join(projectRoot, "codedrobe", "win98", "theme.json");
export const cliPath = path.join(
  projectRoot,
  "node_modules",
  "@codedrobe",
  "core",
  "bin",
  "codedrobe.mjs",
);

export async function readThemeManifest() {
  return JSON.parse(await readFile(manifestPath, "utf8"));
}

export async function resolveThemePackagePath() {
  const theme = await readThemeManifest();
  return path.join(projectRoot, "dist", `${theme.id}-${theme.version}.codedrobe-theme`);
}

export async function ensureRuntimeInstalled() {
  try {
    await access(cliPath);
  } catch {
    throw new Error(
      `CodeDrobe is not installed at ${cliPath}. Run "npm ci" with Node.js 22.4 or newer.`,
    );
  }
}

export function runCodeDrobe(args) {
  const result = spawnSync(process.execPath, [cliPath, ...args], {
    cwd: projectRoot,
    stdio: "inherit",
    windowsHide: true,
  });

  if (result.error) throw result.error;
  return result.status ?? 1;
}

export async function packTheme() {
  await ensureRuntimeInstalled();
  const outputPath = await resolveThemePackagePath();
  await mkdir(path.dirname(outputPath), { recursive: true });

  const status = runCodeDrobe([
    "theme",
    "pack",
    manifestPath,
    "--output",
    outputPath,
    "--force",
  ]);
  if (status !== 0) {
    throw new Error(`CodeDrobe theme pack failed with exit code ${status}.`);
  }

  return outputPath;
}
