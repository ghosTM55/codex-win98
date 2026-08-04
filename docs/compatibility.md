# Compatibility

Last updated: 2026-08-04

## Supported surface

Codex 98 targets the Codex view in the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app). It does not target Chat, Work, the web app, Codex CLI, or IDE extensions.

The full skin relies on private desktop DOM landmarks. OpenAI's supported [Appearance settings](https://learn.chatgpt.com/docs/reference/settings) cover colors and fonts but not arbitrary component CSS. Full-skin compatibility is therefore best-effort and may change after a desktop app update.

## Platform matrix

| Platform | Host discovery | Runtime flow | Codex 98 visual QA | Status |
|---|---|---|---|---|
| macOS desktop app | Automatic for standard installations | Apply and restore exercised | Main Codex routes reviewed; exact app build was not recorded | Preview |
| Windows 11 Microsoft Store app | Automatic through the CodeDrobe adapter | Apply/restart flow verified upstream | Full theme route and scaling pass pending | Experimental |
| Windows custom installation | `--app-path` when discovery fails | Uses the same adapter | Not verified | Experimental |
| Linux | No supported desktop host | Not supported | Not applicable | Unsupported |
| Web, CLI, IDE extensions | Different surfaces | Not supported | Not applicable | Unsupported |

The pinned CodeDrobe runtime reports a macOS adapter baseline of app version `26.707.72221`, build `5307`, verified on 2026-07-16. Its Microsoft Store Codex adapter passed the apply/restart flow on Windows on 2026-07-18. These are runtime-adapter results, not complete visual verification of every Codex 98 selector.

## Theme isolation

The stylesheet activates only when the renderer has all of the following:

1. `data-codedrobe-host="codex"`
2. `data-codedrobe-theme="codex-win98"`
3. `main.main-surface`

The manifest also requires the Codex main surface before applying. These guards reduce the chance of styling secondary or non-Codex surfaces, but cannot guarantee isolation if a future app version changes or reuses the same private landmarks.

If styles appear in Chat, Work, or an auxiliary window, run `npm run theme:restore` immediately and report the operating system, app version, current view, and whether the app was already running. Do not publish conversation text, paths, form values, links, or media URLs.

## Fonts and display scaling

No font files are bundled. Missing fonts fall through to the next installed option.

| Role | Windows preference | macOS preference | Portable fallback |
|---|---|---|---|
| UI | Tahoma, Microsoft YaHei UI | PingFang SC, Arial | system sans-serif |
| Code | Cascadia Mono, Consolas | SFMono-Regular, Menlo, Monaco | monospace |

Glyph metrics may differ by operating system, locale, font installation, and display scaling. Windows 100%, 125%, 150%, and 200% scaling still require a complete real-device pass.

## Operational limitations

- An existing app without the debugging flag is never closed by the default apply command.
- `--restart-existing` must remain an explicit user choice because it closes the current desktop process.
- A non-default loopback port must be passed to both apply and restore.
- A custom Windows installation may require an explicit installation directory or executable through `--app-path`.
- An ordinary app launch removes the session CSS because the theme does not persist host appearance settings.
- High contrast and forced-colors modes have not completed full-skin visual verification; use a native fallback.
- Desktop app updates can invalidate selectors even when application discovery and launch still work.

## Release verification

Before changing a platform status, verify the exact app build on a real device across the Codex home page, active conversation, code and diff views, terminal/output, permission dialogs, collapsed sidebar, narrow window, secondary renderer windows, and restore flow. Check focus visibility, clipping, scrollability, contrast, console errors, and isolation from Chat and Work.
