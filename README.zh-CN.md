# Codex 98

[English](README.md)

Codex 98 是用于 ChatGPT 桌面客户端 **Codex 视图**的非官方 Windows 98 风格主题。它使用直角控件、经典系统配色、凸起与凹陷边框、紧凑排版和高对比交互状态，替代现代圆角与半透明界面。

完整皮肤只在当前桌面客户端会话中生效，不修改已安装的应用程序包、`app.asar`、二进制文件或代码签名。

> [!IMPORTANT]
> Codex 98 是独立项目，与 Microsoft、OpenAI、CodeDrobe 不存在从属、背书或赞助关系。

## 平台支持

| 平台 | 完整皮肤 | 原生降级版 | 说明 |
|---|---|---|---|
| macOS | 预览版 | 支持 | 主要视觉测试平台；客户端更新可能破坏私有 DOM 选择器。 |
| Windows 11、Microsoft Store 客户端 | 实验性 | 支持 | CodeDrobe 上游已验证应用/重启链路；Codex 98 仍缺少完整 Windows 视觉验收。 |
| Windows、自定义安装位置 | 实验性 | 支持 | 自动发现失败时需要传入 `--app-path`。 |
| Linux、Web、CLI、IDE 扩展 | 不支持 | 不支持 | 不属于本项目范围。 |

测试基线、作用域边界和已知限制见[兼容性说明](docs/compatibility.md)。

## 环境要求

- 当前版 [ChatGPT 桌面客户端](https://learn.chatgpt.com/docs/app)，并具有 Codex 使用权限
- macOS 或 Windows 11
- Node.js 22.4 或更高版本
- npm

项目固定使用 `@codedrobe/core@0.7.0-beta.0`。桌面客户端发现和渲染器隔离对版本敏感，因此不会自动升级运行时。

## 从源码安装

下载或克隆仓库后运行：

```sh
npm ci
npm run verify
```

`npm run verify` 会验证主题清单、脚本、平台降级配置和 CSS 边界，并生成：

```text
dist/codex-win98-0.4.0.codedrobe-theme
```

生成的主题包只包含主题清单和 CSS，不包含可执行的主题 JavaScript。

## 应用完整皮肤

保存桌面客户端中的工作，切换到 Codex 视图，然后运行：

```sh
npm run theme:apply
```

默认命令不会关闭已经运行的桌面客户端。如果客户端启动时没有开启所需的本机调试参数，命令会以 `CODEDROBE_RESTART_REQUIRED` 退出，且不会改动现有进程。

保存全部工作后，可以显式允许重启：

```sh
npm run theme:apply:restart
```

该命令会先关闭现有 ChatGPT 桌面客户端进程，再通过 CodeDrobe 重新启动。

### 自定义客户端路径

macOS：

```sh
npm run theme:apply -- --app-path "/Applications/ChatGPT.app"
```

Windows PowerShell 或命令提示符：

```powershell
npm run theme:apply -- --app-path "D:\Path\To\ChatGPT.exe"
```

Windows Microsoft Store 客户端通常可以自动发现。`--app-path` 可以指向应用程序包、安装目录或可执行文件。

### 使用 GitHub Release 主题包

从 GitHub Releases 下载 `.codedrobe-theme` 文件后，无需克隆源码即可应用：

```sh
npx --yes --package=@codedrobe/core@0.7.0-beta.0 codedrobe apply --app codex --theme "./codex-win98-0.4.0.codedrobe-theme"
```

只有在工作已保存，并明确接受关闭现有桌面客户端进程时，才附加 `--restart-existing`。

## 恢复原始界面

从源码目录恢复：

```sh
npm run theme:restore
```

直接使用 Release 主题包时：

```sh
npx --yes --package=@codedrobe/core@0.7.0-beta.0 codedrobe restore --app codex
```

完整皮肤仅在当前会话生效；不通过 CodeDrobe 普通启动客户端，也会移除注入的 CSS。如果应用主题时使用了非默认端口，恢复时需要传入相同端口：

```sh
npm run theme:restore -- --port 9440
```

## 原生降级版

官方 [Appearance 设置](https://learn.chatgpt.com/docs/reference/settings)支持自定义颜色和字体，但不支持组件级 CSS。以下预设无需调试会话即可复现主题配色和字体：

- `themes/codex-98-native-windows.txt`
- `themes/codex-98-native-macos.txt`
- `themes/codex-98-native-portable.txt`

在 **Settings → Appearance** 中导入对应文件的完整单行内容。原生预设无法实现 3D 边框、直角几何或经典滚动条。

## 故障处理

- **`CODEDROBE_RESTART_REQUIRED`：**保存工作后运行 `npm run theme:apply:restart`，或者手动关闭客户端，再执行普通应用命令。
- **无法找到客户端：**使用 `--app-path` 传入 `.app` 包、安装目录或可执行文件。
- **缺少必要 DOM 地标：**桌面客户端可能已经更新。先恢复界面并查看[兼容性说明](docs/compatibility.md)，再报告客户端版本和所在页面。
- **样式出现在 Codex 之外：**立即恢复。主题同时检查宿主、主题 ID 和 Codex 主界面，但未来版本可能修改或复用私有 DOM 地标。
- **高对比度或强制颜色模式：**使用原生降级版；这些模式尚未完成完整皮肤视觉验证。

## 安全

CodeDrobe 通过 `127.0.0.1` 上的 Chromium DevTools Protocol 应用完整皮肤。不要通过防火墙规则、代理、隧道、容器端口映射或公共网络暴露调试端口。运行时边界和报告方式见[安全说明](SECURITY.md)。

主题不包含遥测、网络请求、字体文件、Microsoft 素材或从 ChatGPT 客户端提取的素材。

## 仓库结构

```text
codedrobe/win98/theme.json   主题清单和兼容性地标
codedrobe/win98/codex.css    Codex 桌面端完整皮肤
themes/                      macOS 和 Windows 原生 Appearance 预设
scripts/                     跨平台打包、应用和恢复脚本
tests/                       确定性源码与边界检查
docs/compatibility.md        平台支持与已知限制
```

开发和贡献要求见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

Codex 98 使用 [PolyForm Noncommercial License 1.0.0](LICENSE)，禁止商业使用。

这是**源码可见（source-available）软件，不是 OSI 认可的开源软件**。个人学习、研究、实验、业余使用，以及许可证定义的非商业机构用途由许可证授权；任何预期商业用途都必须另行获得著作权人的许可。

依赖和商标信息见[第三方声明](THIRD_PARTY_NOTICES.md)。
