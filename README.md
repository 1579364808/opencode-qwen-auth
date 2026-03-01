# 🤖 Qwen Code OAuth Plugin for OpenCode

![npm version](https://img.shields.io/npm/v/%40melodyoftears%2Fopencode-qwen-auth)
![License](https://img.shields.io/github/license/1579364808/opencode-qwen-auth)
![GitHub stars](https://img.shields.io/github/stars/1579364808/opencode-qwen-auth)

<p align="center">
  <img src="assets/screenshot.png" alt="OpenCode with Qwen Code" width="800">
</p>

**Authenticate OpenCode CLI with your qwen.ai account.** This plugin enables you to use Qwen OAuth models (`coder-model` and `vision-model`) with **2,000 free requests per day** - no API key or credit card required!

[🇨🇳 中文文档](./README.zh-CN.md)

## ✨ Features

- 🔐 **OAuth Device Flow** - Secure browser-based authentication (RFC 8628)
- ⚡ **Automatic Polling** - No need to press Enter after authorizing
- 🆓 **2,000 req/day free** - Generous free tier with no credit card
- 🧠 **1M context window** - Models with 1 million token context
- 🔄 **Auto-refresh** - Tokens renewed automatically before expiration
- 🔗 **qwen-code compatible** - Reuses credentials from `~/.qwen/oauth_creds.json`

## 📋 Prerequisites

- [OpenCode CLI](https://opencode.ai) installed
- A [qwen.ai](https://chat.qwen.ai) account (free to create)

## 🚀 Installation

### 1. Install the plugin

```bash
cd ~/.opencode && npm install @melodyoftears/opencode-qwen-auth
```

### 2. Enable the plugin

Edit `~/.opencode/opencode.jsonc`:

```json
{
  "plugin": ["@melodyoftears/opencode-qwen-auth"]
}
```

## 🔑 Usage

### 1. Login

```bash
opencode auth login
```

### 2. Select Provider

Choose **"Other"** and type `qwen-code`

### 3. Authenticate

Select **"Qwen Code (qwen.ai OAuth)"**

- A browser window will open for you to authorize
- The plugin automatically detects when you complete authorization
- No need to copy/paste codes or press Enter!

> [!TIP]
> In the OpenCode TUI (graphical interface), the **Qwen Code** provider appears automatically in the provider list.

## 🎯 Available Models

| Model | ID | Input | Output | Context | Max Output | Cost |
|-------|----|-------|--------|---------|------------|------|
| Qwen Coder (Qwen 3.5 Plus) | `coder-model` | text | text | 1M tokens | 65,536 tokens | Free |
| Qwen VL Plus (Vision) | `vision-model` | text, image | text | 128K tokens | 8,192 tokens | Free |

### Using a specific model

```bash
opencode --provider qwen-code --model coder-model
opencode --provider qwen-code --model vision-model
```

## ⚙️ How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   OpenCode CLI  │────▶│  qwen.ai OAuth   │────▶│  Qwen Models    │
│                 │◀────│  (Device Flow)   │◀────│  API            │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

1. **Device Flow (RFC 8628)**: Opens your browser to `chat.qwen.ai` for authentication
2. **Automatic Polling**: Detects authorization completion automatically
3. **Token Storage**: Saves credentials to `~/.qwen/oauth_creds.json`
4. **Auto-refresh**: Renews tokens 30 seconds before expiration

## 📊 Usage Limits

| Plan | Rate Limit | Daily Limit |
|------|------------|-------------|
| Free (OAuth) | 60 req/min | 2,000 req/day |

> [!NOTE]
> Limits reset at midnight UTC. For higher limits, consider using an API key from [DashScope](https://dashscope.aliyun.com).

## 🔧 Troubleshooting

### Token expired

The plugin automatically renews tokens. If issues persist:

```bash
# Remove old credentials
rm ~/.qwen/oauth_creds.json

# Re-authenticate
opencode auth login
```

### Provider not showing in `auth login`

The `qwen-code` provider is added via plugin. In the `opencode auth login` command:

1. Select **"Other"**
2. Type `qwen-code`

### Rate limit exceeded (429 errors)

- Wait until midnight UTC for quota reset
- Switch to another Qwen account and login again if quota is exhausted
- Consider [DashScope API](https://dashscope.aliyun.com) for higher limits

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/1579364808/opencode-qwen-auth.git
cd opencode-qwencode-auth

# Install dependencies
bun install

# Type check
bun run typecheck
```

### Local testing

Edit `~/.opencode/package.json`:

```json
{
  "dependencies": {
    "@melodyoftears/opencode-qwen-auth": "file:///absolute/path/to/opencode-qwencode-auth"
  }
}
```

Then reinstall:

```bash
cd ~/.opencode && npm install
```

## 📁 Project Structure

```
src/
├── constants.ts        # OAuth endpoints, models config
├── types.ts            # TypeScript interfaces
├── index.ts            # Main plugin entry point
├── qwen/
│   └── oauth.ts        # OAuth Device Flow + PKCE
└── plugin/
    ├── auth.ts         # Credentials management
    └── utils.ts        # Helper utilities
```

## 🔗 Related Projects

- [qwen-code](https://github.com/QwenLM/qwen-code) - Official Qwen coding CLI
- [OpenCode](https://opencode.ai) - AI-powered CLI for development
- [opencode-gemini-auth](https://github.com/jenslys/opencode-gemini-auth) - Similar plugin for Google Gemini

## 📄 License

MIT

---

<p align="center">
  Made with ❤️ for the OpenCode community
</p>
