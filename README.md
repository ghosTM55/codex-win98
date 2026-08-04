# Codex 98

[简体中文](README.zh-CN.md)

Codex 98 is an unofficial Windows 98-style theme for the **Codex view** in the ChatGPT desktop app. It replaces rounded, translucent interface chrome with square controls, classic system colors, raised and sunken borders, compact typography, and high-contrast interaction states.

The full skin is applied for the current desktop session only. It does not modify the installed application bundle, `app.asar`, binaries, or code signatures.

> [!IMPORTANT]
> Codex 98 is an independent project and is not affiliated with, endorsed by, or sponsored by Microsoft, OpenAI, or CodeDrobe.

## Preview

![Codex 98 theme with Office Pet](docs/assets/codex-98-office-pet.png)

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
- Git and npm

The project pins `@codedrobe/core@0.7.0-beta.0`. The version is intentionally fixed because desktop discovery and renderer isolation are compatibility-sensitive.

## Recommended companion: Office Pet

For the most convincing classic desktop combination, select **Office Pet** in **Settings → Pets**, then enter `/pet` in a task or choose **Wake Pet** from the command menu. If Office Pet is not present in your Pets picker, choose another office-style pet available in your client.

Pets are a built-in ChatGPT desktop feature and are not installed, bundled, or modified by this theme. See the official [Pets guide](https://learn.chatgpt.com/docs/pets?surface=app).

## Install with an AI coding agent

Give the prompt for your platform to an AI coding agent with local terminal access.

### macOS prompt

```text
Install Codex 98 from https://github.com/ghosTM55/codex-win98 on this Mac. Check that Git, npm, and Node.js 22.4 or newer are available. Use ~/Projects/codex-win98: clone it if absent, or update it without discarding local changes. Run npm ci and npm run verify. Do not modify ChatGPT.app, app.asar, binaries, code signatures, shell profiles, or persistent system settings. Report the result and any error.
```

### Windows 11 prompt

```text
Using PowerShell, install Codex 98 from https://github.com/ghosTM55/codex-win98 on this Windows 11 PC. Check that Git, npm, and Node.js 22.4 or newer are available. Use $env:USERPROFILE\Projects\codex-win98: clone it if absent, or update it without discarding local changes. Run npm ci and npm run verify. Do not modify the installed app package, app.asar, binaries, code signatures, PowerShell profiles, registry, or persistent system settings. Report the result and any error.
```

`npm run verify` checks the project and builds `dist/codex-win98-0.4.0.codedrobe-theme`.

## Start the theme manually

From the repository:

```sh
npm run theme:apply
```

This command never closes an existing app. If it returns `CODEDROBE_RESTART_REQUIRED`, save your work first, then run:

```sh
npm run theme:apply:restart
```

If app discovery fails:

```sh
# macOS
npm run theme:apply -- --app-path "/Applications/ChatGPT.app"

# Windows PowerShell
npm run theme:apply -- --app-path "C:\Path\To\ChatGPT.exe"
```

## Restore the original interface

```sh
npm run theme:restore
```

If the theme was applied on another port, restore with the same port:

```sh
npm run theme:restore -- --port 9440
```

The full skin is session-only. Launching ChatGPT normally without CodeDrobe also restores the original interface.

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
