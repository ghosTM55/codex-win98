import { getAdapter } from "@codedrobe/core";

export const CODEX_MAIN_ROOTS = Object.freeze([
  "main:has(.composer-surface-chrome)",
  "main.main-surface",
]);

function isPrimaryCodexRenderer(target) {
  if (target?.type !== "page") return false;

  let url;
  try {
    url = new URL(String(target.url ?? ""));
  } catch {
    return false;
  }

  if (url.protocol !== "app:" || url.hostname !== "-" || url.pathname !== "/index.html") {
    return false;
  }

  const initialRoute = url.searchParams.get("initialRoute") ?? "";
  return !initialRoute.toLowerCase().startsWith("/avatar-overlay");
}

export function createCodex98Adapter() {
  const baseAdapter = getAdapter("codex");
  return {
    ...baseAdapter,
    verification: {
      ...baseAdapter.verification,
      rootAny: [...CODEX_MAIN_ROOTS],
    },
    matchTarget: isPrimaryCodexRenderer,
  };
}
