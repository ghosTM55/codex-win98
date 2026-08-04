import { access, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const read = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");
const [
  codexCss,
  themeSource,
  packageSource,
  readme,
  readmeZh,
  license,
  packScript,
  sessionScript,
  toolScript,
  nativeWindows,
  nativeMacos,
  nativePortable,
] = await Promise.all([
  read("codedrobe/win98/codex.css"),
  read("codedrobe/win98/theme.json"),
  read("package.json"),
  read("README.md"),
  read("README.zh-CN.md"),
  read("LICENSE"),
  read("scripts/pack-theme.mjs"),
  read("scripts/theme-session.mjs"),
  read("scripts/theme-tools.mjs"),
  read("themes/codex-98-native-windows.txt"),
  read("themes/codex-98-native-macos.txt"),
  read("themes/codex-98-native-portable.txt"),
]);
const theme = JSON.parse(themeSource);
const packageJson = JSON.parse(packageSource);

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(theme.schemaVersion === 1, "theme schema version changed");
assert(theme.id === "codex-win98", "theme id changed");
assert(theme.copy === undefined, "unused legacy renderer copy remains in the manifest");
assert(theme.targets?.codex?.css === "codex.css", "Codex CSS target is missing");
assert(
  theme.targets.codex.options?.rendererProfile === undefined,
  "theme should not inject the legacy Codex renderer profile",
);
assert(
  !theme.targets.codex.options || !Object.hasOwn(theme.targets.codex.options, "baseTheme"),
  "full skin must remain session-only and not persist host appearance settings",
);
assert(
  theme.targets.codex.verification?.required?.some(
    ({ any }) => Array.isArray(any) && any.includes("main.main-surface"),
  ),
  "theme does not require the Codex main surface",
);

assert(packageJson.version === theme.version, "package.json and theme.json versions differ");
assert(packageJson.private === true, "theme project must not be accidentally published to npm");
assert(
  packageJson.license === "PolyForm-Noncommercial-1.0.0",
  "package license is not PolyForm Noncommercial",
);
assert(
  packageJson.devDependencies?.["@codedrobe/core"] === "0.7.0-beta.0",
  "CodeDrobe runtime must remain exactly pinned until compatibility is reverified",
);
assert(packageJson.engines?.node === ">=22.4", "Node.js runtime floor changed");
assert(packageJson.scripts["theme:pack"], "theme packaging script is missing");
assert(packageJson.scripts["theme:apply"], "safe theme apply script is missing");
assert(packageJson.scripts["theme:apply:restart"], "explicit restart script is missing");
assert(packageJson.scripts["theme:restore"], "theme restore script is missing");
assert(
  !packageJson.scripts["theme:apply"].includes("--restart-existing"),
  "default apply script must not restart an existing app",
);
assert(
  packageJson.scripts["theme:apply:restart"].includes("--restart-existing"),
  "restart behavior must remain explicit",
);

assert(toolScript.includes("node_modules"), "runtime helper does not use the installed dependency");
assert(!toolScript.includes("tmp/codedrobe-audit"), "runtime helper still uses a local audit copy");
assert(toolScript.includes("windowsHide: true"), "cross-platform child process options are missing");
assert(packScript.includes("packTheme"), "pack script does not use the shared pack helper");
assert(sessionScript.includes("packTheme"), "apply script does not build the current manifest");
assert(sessionScript.includes("--app-path"), "custom app path forwarding is missing");
assert(sessionScript.includes("--port"), "loopback port forwarding is missing");
assert(sessionScript.includes("--restart-existing"), "explicit restart forwarding is missing");
assert(!sessionScript.includes("--timeout-ms"), "session script forwards an unsupported timeout option");
assert(!sessionScript.includes('"--port", "9335"'), "session script hardcodes a port");

const scope =
  '[data-codedrobe-host="codex"][data-codedrobe-theme="codex-win98"]:has(main.main-surface)';
assert(codexCss.includes(scope), "Codex CSS lacks exact theme and main-surface scoping");
assert(!codexCss.includes("codex-skin"), "Codex CSS still depends on the legacy renderer profile");
assert(
  !codexCss.includes("html.codedrobe-host-codex "),
  "Codex CSS contains a host-only selector that can leak across unified app views",
);
assert(
  !codexCss.includes(':is(input, textarea, select, [contenteditable="true"])'),
  "text-field styling is broad enough to capture every input type",
);
assert(
  codexCss.includes('input[type="checkbox"]') &&
    codexCss.includes('input[type="radio"]') &&
    codexCss.includes('input[type="range"]'),
  "native choice controls are not handled separately",
);
assert(codexCss.includes('[role="tooltip"]'), "tooltip styling is missing");
assert(codexCss.includes("@media (max-width: 820px)"), "narrow-window handling is missing");
assert(
  codexCss.includes("@media (prefers-reduced-motion: reduce)"),
  "reduced-motion handling is missing",
);
assert(codexCss.includes('"Microsoft YaHei UI"'), "Windows Chinese UI fallback is missing");
assert(codexCss.includes('"PingFang SC"'), "macOS Chinese UI fallback is missing");
assert(codexCss.includes('"Cascadia Mono"'), "Windows code fallback is missing");
assert(codexCss.includes('"SFMono-Regular"'), "macOS code fallback is missing");
assert(!codexCss.includes("@font-face"), "theme must not bundle or declare external font files");
assert(!codexCss.includes("url("), "theme CSS unexpectedly references an external asset");

const braceBalance = [...codexCss].reduce((balance, character) => {
  if (character === "{") return balance + 1;
  if (character === "}") return balance - 1;
  return balance;
}, 0);
assert(braceBalance === 0, `codex.css brace balance is ${braceBalance}, expected 0`);

for (const [platform, source] of [
  ["Windows", nativeWindows],
  ["macOS", nativeMacos],
  ["portable", nativePortable],
]) {
  const prefix = "codex-theme-v1:";
  assert(source.trim().startsWith(prefix), `${platform} native fallback prefix is invalid`);
  try {
    const preset = JSON.parse(source.trim().slice(prefix.length));
    assert(preset.variant === "light", `${platform} native fallback must be light`);
    assert(preset.theme?.accent === "#000080", `${platform} native accent changed`);
    assert(preset.theme?.surface === "#C0C0C0", `${platform} native surface changed`);
    assert(preset.theme?.ink === "#000000", `${platform} native ink changed`);
  } catch (error) {
    failures.push(`${platform} native fallback is not valid JSON: ${error.message}`);
  }
}

assert(license.includes("PolyForm Noncommercial License 1.0.0"), "LICENSE text is missing");
assert(
  readme.includes("source-available") && readmeZh.includes("源码可见"),
  "README files do not explain the non-open-source license boundary",
);
assert(
  readme.includes("theme:apply:restart") && readmeZh.includes("theme:apply:restart"),
  "README files do not document explicit restart behavior",
);
assert(
  readme.includes("Windows") && readmeZh.includes("Windows"),
  "README files do not document Windows support",
);

const sessionScriptPath = fileURLToPath(new URL("../scripts/theme-session.mjs", import.meta.url));
for (const [args, expectedMessage] of [
  [["restore", "--app-path", "/not-used"], "Unsupported restore option"],
  [["apply", "--timeout-ms", "5000"], "Unsupported apply option"],
  [["apply", "--port", "9335", "--port", "9440"], "Duplicate option"],
  [["apply", "--port", "70000"], "--port must be an integer"],
]) {
  const result = spawnSync(process.execPath, [sessionScriptPath, ...args], {
    cwd: projectRoot,
    encoding: "utf8",
    windowsHide: true,
  });
  assert(result.status !== 0, `invalid session arguments unexpectedly passed: ${args.join(" ")}`);
  assert(
    result.stderr.includes(expectedMessage),
    `invalid session arguments did not report "${expectedMessage}": ${args.join(" ")}`,
  );
}

for (const relativePath of [
  ".github/workflows/verify.yml",
  "docs/compatibility.md",
  "SECURITY.md",
  "THIRD_PARTY_NOTICES.md",
]) {
  try {
    await access(new URL(`../${relativePath}`, import.meta.url));
  } catch {
    failures.push(`documented file is missing: ${relativePath}`);
  }
}

for (const privatePath of ["AGENTS.md", "CONTEXT.md", "artifacts", "doc", "tmp"]) {
  try {
    await access(new URL(`../${privatePath}`, import.meta.url));
    failures.push(`non-public project material remains: ${privatePath}`);
  } catch {
    // Expected: private working material does not belong in the public project.
  }
}

if (failures.length) {
  console.error(`Static checks failed in ${projectRoot}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Static checks passed for Codex 98 ${theme.version}.`);
}
