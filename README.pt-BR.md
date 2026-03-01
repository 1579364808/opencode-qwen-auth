# 🤖 Qwen Code OAuth Plugin para OpenCode

![npm version](https://img.shields.io/npm/v/opencode-qwencode-auth)
![License](https://img.shields.io/github/license/1579364808/opencode-qwen-auth)
![GitHub stars](https://img.shields.io/github/stars/1579364808/opencode-qwen-auth)

<p align="center">
  <img src="assets/screenshot.png" alt="OpenCode com Qwen Code" width="800">
</p>

**Autentique o OpenCode CLI com sua conta qwen.ai.** Este plugin permite usar modelos Qwen (Coder, Max, Plus e mais) com **2.000 requisições gratuitas por dia** - sem API key ou cartão de crédito!

[🇺🇸 Read in English](./README.md)

## ✨ Funcionalidades

- 🔐 **OAuth Device Flow** - Autenticação segura via navegador (RFC 8628)
- ⚡ **Polling Automático** - Não precisa pressionar Enter após autorizar
- 🆓 **2.000 req/dia grátis** - Plano gratuito generoso sem cartão
- 🧠 **1M de contexto** - Modelos com 1 milhão de tokens de contexto
- 🔄 **Auto-refresh** - Tokens renovados automaticamente antes de expirar
- 🔗 **Compatível com qwen-code** - Reutiliza credenciais de `~/.qwen/oauth_creds.json`

## 📋 Pré-requisitos

- [OpenCode CLI](https://opencode.ai) instalado
- Uma conta [qwen.ai](https://chat.qwen.ai) (gratuita)

## 🚀 Instalação

### 1. Instale o plugin

```bash
cd ~/.opencode && npm install opencode-qwencode-auth
```

### 2. Habilite o plugin

Edite `~/.opencode/opencode.jsonc`:

```json
{
  "plugin": ["opencode-qwencode-auth"]
}
```

## 🔑 Uso

### 1. Login

```bash
opencode auth login
```

### 2. Selecione o Provider

Escolha **"Other"** e digite `qwen-code`

### 3. Autentique

Selecione **"Qwen Code (qwen.ai OAuth)"**

- Uma janela do navegador abrirá para você autorizar
- O plugin detecta automaticamente quando você completa a autorização
- Não precisa copiar/colar códigos ou pressionar Enter!

> [!TIP]
> No TUI do OpenCode (interface gráfica), o provider **Qwen Code** aparece automaticamente na lista de providers.

## 🎯 Modelos Disponíveis

### Modelos de Código

| Modelo | Contexto | Max Output | Melhor Para |
|--------|----------|------------|-------------|
| `qwen3-coder-plus` | 1M tokens | 64K tokens | Tarefas complexas de código |
| `qwen3-coder-flash` | 1M tokens | 64K tokens | Respostas rápidas de código |

### Modelos de Propósito Geral

| Modelo | Contexto | Max Output | Reasoning | Melhor Para |
|--------|----------|------------|-----------|-------------|
| `qwen3-max` | 256K tokens | 64K tokens | Não | Modelo flagship, raciocínio complexo e tool use |
| `qwen-plus-latest` | 128K tokens | 16K tokens | Sim | Equilíbrio qualidade-velocidade com thinking mode |
| `qwen3-235b-a22b` | 128K tokens | 32K tokens | Sim | Maior modelo open-weight MoE com thinking mode |
| `qwen-flash` | 1M tokens | 8K tokens | Não | Ultra-rápido, baixo custo para tarefas simples |

### Usando um modelo específico

```bash
opencode --provider qwen-code --model qwen3-coder-plus
opencode --provider qwen-code --model qwen3-max
opencode --provider qwen-code --model qwen-plus-latest
```

## ⚙️ Como Funciona

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   OpenCode CLI  │────▶│  qwen.ai OAuth   │────▶│  Qwen Models    │
│                 │◀────│  (Device Flow)   │◀────│  API            │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

1. **Device Flow (RFC 8628)**: Abre seu navegador em `chat.qwen.ai` para autenticação
2. **Polling Automático**: Detecta a conclusão da autorização automaticamente
3. **Armazenamento de Token**: Salva credenciais em `~/.qwen/oauth_creds.json`
4. **Auto-refresh**: Renova tokens 30 segundos antes de expirar

## 📊 Limites de Uso

| Plano | Rate Limit | Limite Diário |
|-------|------------|---------------|
| Gratuito (OAuth) | 60 req/min | 2.000 req/dia |

> [!NOTE]
> Os limites resetam à meia-noite UTC. Para limites maiores, considere usar uma API key do [DashScope](https://dashscope.aliyun.com).

## 🔧 Solução de Problemas

### Token expirado

O plugin renova tokens automaticamente. Se houver problemas:

```bash
# Remova credenciais antigas
rm ~/.qwen/oauth_creds.json

# Re-autentique
opencode auth login
```

### Provider não aparece no `auth login`

O provider `qwen-code` é adicionado via plugin. No comando `opencode auth login`:

1. Selecione **"Other"**
2. Digite `qwen-code`

### Rate limit excedido (erros 429)

- Aguarde até meia-noite UTC para reset da cota
- Tente usar `qwen3-coder-flash` para requisições mais leves
- Considere a [API DashScope](https://dashscope.aliyun.com) para limites maiores

## 🛠️ Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/1579364808/opencode-qwen-auth.git
cd opencode-qwencode-auth

# Instale dependências
bun install

# Verifique tipos
bun run typecheck
```

### Teste local

Edite `~/.opencode/package.json`:

```json
{
  "dependencies": {
    "opencode-qwencode-auth": "file:///caminho/absoluto/para/opencode-qwencode-auth"
  }
}
```

Depois reinstale:

```bash
cd ~/.opencode && npm install
```

## 📁 Estrutura do Projeto

```
src/
├── constants.ts        # Endpoints OAuth, config de modelos
├── types.ts            # Interfaces TypeScript
├── index.ts            # Entry point principal do plugin
├── qwen/
│   └── oauth.ts        # OAuth Device Flow + PKCE
└── plugin/
    ├── auth.ts         # Gerenciamento de credenciais
    └── utils.ts        # Utilitários
```

## 🔗 Projetos Relacionados

- [qwen-code](https://github.com/QwenLM/qwen-code) - CLI oficial do Qwen para programação
- [OpenCode](https://opencode.ai) - CLI com IA para desenvolvimento
- [opencode-gemini-auth](https://github.com/jenslys/opencode-gemini-auth) - Plugin similar para Google Gemini

## 📄 Licença

MIT

---

<p align="center">
  Feito com ❤️ para a comunidade OpenCode
</p>
