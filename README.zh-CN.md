# Codex 98

[English](README.md)

Codex 98 是用于 ChatGPT 桌面客户端 **Codex 视图**的非官方 Windows 98 风格主题。它在当前会话中应用经典配色、直角控件、紧凑排版和立体边框，不修改已安装的客户端。

> [!IMPORTANT]
> 本项目为独立项目，与 Microsoft、OpenAI、CodeDrobe 不存在从属或背书关系。

## 效果预览

![Codex 98 主题与 Office Pet 组合效果](docs/assets/codex-98-office-pet.png)

## 平台支持

支持 macOS 和 Windows 上的 ChatGPT 桌面客户端。已知限制见[兼容性说明](docs/compatibility.md)。

## 环境要求

- 可使用 Codex 的 ChatGPT 桌面客户端
- Node.js 22.4 或更高版本
- Git 和 npm

## 交给 AI 编程代理安装

将对应平台的提示词交给具有本机终端权限的 AI 编程代理。

### macOS 提示词

```text
请在这台 Mac 上安装 Codex 98：https://github.com/ghosTM55/codex-win98。检查 Git、npm 和 Node.js 22.4 或更高版本；克隆仓库，或在不丢弃本地改动的前提下更新已有仓库；然后在仓库根目录运行 npm ci 和 npm run verify。不得修改 ChatGPT 应用包或持久化系统设置。最后报告仓库位置和执行结果。
```

### Windows 11 提示词

```text
请使用 PowerShell 在这台 Windows 11 电脑上安装 Codex 98：https://github.com/ghosTM55/codex-win98。检查 Git、npm 和 Node.js 22.4 或更高版本；克隆仓库，或在不丢弃本地改动的前提下更新已有仓库；然后在仓库根目录运行 npm ci 和 npm run verify。不得修改已安装的应用包、注册表、PowerShell 配置文件或持久化系统设置。最后报告仓库位置和执行结果。
```

## 手动启动主题

在已克隆的 Git 仓库中运行，并将示例路径替换为实际位置。

macOS：

```sh
cd /path/to/codex-win98
npm run theme:apply
```

Windows PowerShell：

```powershell
Set-Location "C:\path\to\codex-win98"
npm run theme:apply
```

也可以将以下提示词交给 AI 编程代理：

```text
找到我现有的 Codex 98 仓库，并在仓库根目录运行 npm run theme:apply。不得修改 ChatGPT 应用包或系统设置。如果返回 CODEDROBE_RESTART_REQUIRED，先提醒我保存工作并取得重启许可，再运行 npm run theme:apply:restart。最后报告执行结果。
```

如果出现 `CODEDROBE_RESTART_REQUIRED`，保存工作后运行：

```sh
npm run theme:apply:restart
```

## 恢复

在同一仓库目录运行：

```sh
npm run theme:restore
```

完整主题仅在当前会话生效；不通过 CodeDrobe 普通启动 ChatGPT 也会恢复原始界面。

## 推荐组合：Office Pet

预览图使用单独安装的 [Clippy（Office Pet）](https://github.com/Dimava/codex-clippy)。在任务中输入 `/pet` 或选择 **Wake Pet** 即可启动，具体用法见官方 [Pets 指南](https://learn.chatgpt.com/docs/pets?surface=app)。

## 故障处理

- **找不到客户端：**运行 `npm run theme:apply -- --app-path "/path/to/ChatGPT"`。
- **客户端更新后主题失效：**恢复原始界面并查看[兼容性说明](docs/compatibility.md)。

## 安全

完整主题通过 `127.0.0.1` 上的 Chromium DevTools Protocol 应用。不要向公共网络暴露调试端口。主题不包含遥测，也不捆绑 Microsoft 或 ChatGPT 素材。详见[安全说明](SECURITY.md)。

## 许可证

Codex 98 使用 [PolyForm Noncommercial License 1.0.0](LICENSE)，禁止商业使用。

这是**源码可见（source-available）软件，不是 OSI 认可的开源软件**。依赖和商标信息见[第三方声明](THIRD_PARTY_NOTICES.md)。
