import { ensureRuntimeInstalled, packTheme, runCodeDrobe } from "./theme-tools.mjs";

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

const args = [action, "--app", "codex"];
if (action === "apply") {
  const themePath = await packTheme();
  args.push("--theme", themePath);
} else {
  await ensureRuntimeInstalled();
}
args.push(...forwardedArgs);

const status = runCodeDrobe(args);
if (status !== 0) process.exitCode = status;
