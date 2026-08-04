import {
  applySkin,
  readThemePackage,
  resolveThemeTarget,
  restoreSkin,
} from "@codedrobe/core";
import { createCodex98Adapter } from "./codex-adapter.mjs";
import { ensureRuntimeInstalled, packTheme } from "./theme-tools.mjs";

const [action, ...forwardedArgs] = process.argv.slice(2);
if (!["apply", "restore"].includes(action)) {
  throw new Error("Usage: node scripts/theme-session.mjs <apply|restore> [options]");
}

const booleanFlags = action === "apply" ? new Set(["--restart-existing"]) : new Set();
const valueFlags = action === "apply" ? new Set(["--app-path", "--port"]) : new Set(["--port"]);
const seenFlags = new Set();

for (let index = 0; index < forwardedArgs.length; index += 1) {
  const argument = forwardedArgs[index];
  if (seenFlags.has(argument)) throw new Error(`Duplicate option "${argument}".`);
  if (booleanFlags.has(argument)) {
    seenFlags.add(argument);
    continue;
  }
  if (valueFlags.has(argument)) {
    const value = forwardedArgs[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`${argument} requires a value.`);
    }
    seenFlags.add(argument);
    index += 1;
    continue;
  }
  const allowed = [...booleanFlags, ...valueFlags].join(", ") || "none";
  throw new Error(`Unsupported ${action} option "${argument}". Allowed options: ${allowed}.`);
}

const portIndex = forwardedArgs.indexOf("--port");
if (portIndex >= 0) {
  const port = Number(forwardedArgs[portIndex + 1]);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error("--port must be an integer from 1024 through 65535.");
  }
}

const valueFor = (flag) => {
  const index = forwardedArgs.indexOf(flag);
  return index >= 0 ? forwardedArgs[index + 1] : undefined;
};

const adapter = createCodex98Adapter();
const requestedPort = valueFor("--port");
const port = requestedPort === undefined ? adapter.defaultPort : Number(requestedPort);

try {
  let result;
  if (action === "apply") {
    const themePath = await packTheme();
    const bundle = await readThemePackage(themePath);
    const targetTheme = resolveThemeTarget(bundle, adapter.id);
    result = await applySkin({
      adapter,
      targetTheme,
      port,
      appPath: valueFor("--app-path"),
      restartExisting: forwardedArgs.includes("--restart-existing"),
    });
  } else {
    await ensureRuntimeInstalled();
    result = await restoreSkin({ adapter, port });
  }
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(`[codedrobe] ${error.message}`);
  if (error.results) console.error(JSON.stringify(error.results, null, 2));
  process.exitCode = 1;
}
