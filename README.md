# Codex 98

[简体中文](README.zh-CN.md)

Codex 98 is an unofficial Windows 98-style theme for the **Codex view** in the ChatGPT desktop app. It applies classic colors, square controls, compact typography, and raised or sunken borders for the current session without modifying the installed app.

> [!IMPORTANT]
> This independent project is not affiliated with or endorsed by Microsoft, OpenAI, or CodeDrobe.

## Preview

![Codex 98 theme with Office Pet](docs/assets/codex-98-office-pet.png)

## Platform support

Supports the ChatGPT desktop app on macOS and Windows. See [Compatibility](docs/compatibility.md) for known limitations.

## Requirements

- ChatGPT desktop app with access to Codex
- Node.js 22.4 or newer
- Git and npm

## Install with an AI coding agent

Give the prompt for your platform to an AI coding agent with local terminal access.

### macOS prompt

```text
Install Codex 98 from https://github.com/ghosTM55/codex-win98 on this Mac. Verify Git, npm, and Node.js 22.4 or newer; clone or safely update the repository; then run npm ci and npm run verify from its root. Do not modify the ChatGPT app bundle or persistent system settings. Report the repository location and result.
```

### Windows 11 prompt

```text
Using PowerShell, install Codex 98 from https://github.com/ghosTM55/codex-win98 on this Windows 11 PC. Verify Git, npm, and Node.js 22.4 or newer; clone or safely update the repository; then run npm ci and npm run verify from its root. Do not modify the installed app package, registry, PowerShell profile, or persistent system settings. Report the repository location and result.
```

## Start the theme manually

Run from the cloned Git repository, replacing the example path with its actual location.

macOS:

```sh
cd /path/to/codex-win98
npm run theme:apply
```

Windows PowerShell:

```powershell
Set-Location "C:\path\to\codex-win98"
npm run theme:apply
```

Or give an AI coding agent this prompt:

```text
Find my existing Codex 98 repository and run npm run theme:apply from its root. Do not modify the ChatGPT app bundle or system settings. If CODEDROBE_RESTART_REQUIRED is returned, ask me to save my work and approve a restart before running npm run theme:apply:restart. Report the result.
```

If `CODEDROBE_RESTART_REQUIRED` appears, save your work and run:

```sh
npm run theme:apply:restart
```

## Restore

From the same repository directory:

```sh
npm run theme:restore
```

The full theme is session-only. Starting ChatGPT normally without CodeDrobe also restores the original interface.

## Recommended companion: Office Pet

The preview uses [Clippy (Office Pet)](https://github.com/Dimava/codex-clippy), installed separately. Enter `/pet` in a task or choose **Wake Pet**; see the official [Pets guide](https://learn.chatgpt.com/docs/pets?surface=app).

## Troubleshooting

- **App not found:** run `npm run theme:apply -- --app-path "/path/to/ChatGPT"`.
- **Theme no longer applies after an app update:** restore the interface and check [Compatibility](docs/compatibility.md).

## Security

The full theme uses Chromium DevTools Protocol on `127.0.0.1`. Never expose its debugging port to a public network. The theme contains no telemetry or bundled Microsoft or ChatGPT assets. See [Security](SECURITY.md).

## License

Codex 98 is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE). Commercial use is not permitted.

This is **source-available software, not OSI-approved open source**. See [Third-party notices](THIRD_PARTY_NOTICES.md) for dependency and trademark information.
