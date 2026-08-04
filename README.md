# Codex 98

[简体中文](README.zh-CN.md)

Codex 98 is an unofficial Windows 98-style theme for the **Codex view** in the ChatGPT desktop app. It replaces rounded, translucent interface chrome with square controls, classic system colors, raised and sunken borders, compact typography, and high-contrast interaction states.

The full skin is applied for the current desktop session only. It does not modify the installed application bundle, `app.asar`, binaries, or code signatures.

> [!IMPORTANT]
> Codex 98 is an independent project and is not affiliated with, endorsed by, or sponsored by Microsoft, OpenAI, or CodeDrobe.

## Platform support

| Platform | Full skin | Native fallback | Notes |
|---|---|---|---|
| macOS | Preview | Supported | Primary visual test platform; app updates may break private DOM selectors. |
| Windows 11, Microsoft Store app | Experimental | Supported | CodeDrobe's apply/restart flow is verified upstream; a complete Codex 98 visual pass on Windows is still pending. |
| Windows, custom installation | Experimental | Supported | Pass `--app-path` if automatic discovery fails. |
| Linux, web, CLI, IDE extensions | Unsupported | Unsupported | These surfaces are outside the project scope. |

See [Compatibility](docs/compatibility.md) for the tested runtime baseline, isolation boundary, and known limitations.

## Requirements

- The current [ChatGPT desktop app](https://learn.chatgpt.com/docs/app) with access to the Codex view
- macOS or Windows 11
- Node.js 22.4 or newer
- npm

The project pins `@codedrobe/core@0.7.0-beta.0`. The version is intentionally fixed because desktop discovery and renderer isolation are compatibility-sensitive.

## Install from source

Download or clone the repository, then run:

```sh
npm ci
npm run verify
```

`npm run verify` validates the manifest, scripts, platform fallbacks, and CSS boundaries, then creates:

```text
dist/codex-win98-0.4.0.codedrobe-theme
```

The generated package contains only the theme manifest and CSS. It does not contain executable theme JavaScript.

## Apply the full skin

Save any work in the desktop app, switch to the Codex view, and run:

```sh
npm run theme:apply
```

The default command never closes an existing desktop app. If the app is already running without the required loopback debugging flag, the command exits with `CODEDROBE_RESTART_REQUIRED` and leaves the app untouched.

After saving all work, an explicit restart can be requested with:

```sh
npm run theme:apply:restart
```

This command closes the existing ChatGPT desktop process before relaunching it through CodeDrobe.

### Custom application paths

macOS:

```sh
npm run theme:apply -- --app-path "/Applications/ChatGPT.app"
```

Windows PowerShell or Command Prompt:

```powershell
npm run theme:apply -- --app-path "D:\Path\To\ChatGPT.exe"
```

The Windows Microsoft Store installation is normally discovered automatically. `--app-path` may point to an application bundle, installation directory, or executable.

### Apply a GitHub Release package

If a `.codedrobe-theme` file was downloaded from GitHub Releases, it can be applied without cloning the source repository:

```sh
npx --yes --package=@codedrobe/core@0.7.0-beta.0 codedrobe apply --app codex --theme "./codex-win98-0.4.0.codedrobe-theme"
```

Add `--restart-existing` only after saving work and accepting that the existing desktop process will be closed.

## Restore the original interface

From a source checkout:

```sh
npm run theme:restore
```

When using the release package directly:

```sh
npx --yes --package=@codedrobe/core@0.7.0-beta.0 codedrobe restore --app codex
```

The full skin is session-only, so an ordinary app launch without CodeDrobe also removes the injected CSS. If a non-default port was used to apply the theme, pass the same port when restoring:

```sh
npm run theme:restore -- --port 9440
```

## Native fallback

The official [Appearance settings](https://learn.chatgpt.com/docs/reference/settings) support custom colors and fonts but not component-level CSS. The following presets reproduce the palette and typography without using a debugging session:

- `themes/codex-98-native-windows.txt`
- `themes/codex-98-native-macos.txt`
- `themes/codex-98-native-portable.txt`

Import the complete single line from the appropriate file in **Settings → Appearance**. Native presets cannot reproduce 3D borders, square geometry, or classic scrollbars.

## Troubleshooting

- **`CODEDROBE_RESTART_REQUIRED`:** save work and run `npm run theme:apply:restart`, or close the app manually and run the normal apply command.
- **Application not found:** pass the `.app` bundle, installation directory, or executable with `--app-path`.
- **Required DOM landmark missing:** the desktop app may have changed. Restore the interface and check [Compatibility](docs/compatibility.md) before reporting the app version and route.
- **Styles appear outside Codex:** restore immediately. The theme uses host, theme, and main-surface guards, but private DOM landmarks can change or be reused by a future app release.
- **High contrast or forced colors:** use a native fallback; these modes have not completed full-skin visual verification.

## Security

CodeDrobe applies the full skin through Chromium DevTools Protocol on `127.0.0.1`. Do not expose the debugging port through a firewall rule, proxy, tunnel, container port mapping, or public network. See [Security](SECURITY.md) for the runtime boundary and reporting guidance.

The theme contains no telemetry, network requests, bundled fonts, Microsoft assets, or extracted ChatGPT assets.

## Repository layout

```text
codedrobe/win98/theme.json   Theme manifest and compatibility landmarks
codedrobe/win98/codex.css    Full Codex desktop skin
themes/                      Native Appearance presets for macOS and Windows
scripts/                     Cross-platform pack, apply, and restore helpers
tests/                       Deterministic source and boundary checks
docs/compatibility.md        Platform support and known limitations
```

Development and contribution requirements are documented in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Codex 98 is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE). Commercial use is not permitted.

This is **source-available software, not OSI-approved open source**. Personal study, research, experimentation, hobby use, and qualifying noncommercial organizations are covered by the license. Any anticipated commercial application requires separate permission from the copyright holder.

See [Third-party notices](THIRD_PARTY_NOTICES.md) for dependency and trademark information.
