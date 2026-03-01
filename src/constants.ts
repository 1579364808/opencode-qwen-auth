/**
 * Qwen OAuth and API Constants
 * Based on qwen-code implementation
 */

// Provider ID
export const QWEN_PROVIDER_ID = 'qwen-code';

// OAuth Device Flow Endpoints (descobertos do qwen-code)
export const QWEN_OAUTH_CONFIG = {
  baseUrl: 'https://chat.qwen.ai',
  deviceCodeEndpoint: 'https://chat.qwen.ai/api/v1/oauth2/device/code',
  tokenEndpoint: 'https://chat.qwen.ai/api/v1/oauth2/token',
  clientId: 'f0304373b74a44d2b584a3fb70ca9e56',
  scope: 'openid profile email model.completion',
  grantType: 'urn:ietf:params:oauth:grant-type:device_code',
} as const;

// Qwen API Configuration
// O resource_url das credenciais é usado para determinar a URL base
export const QWEN_API_CONFIG = {
  // Default base URL (pode ser sobrescrito pelo resource_url das credenciais)
  defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  // Portal URL (usado quando resource_url = "portal.qwen.ai")
  portalBaseUrl: 'https://portal.qwen.ai/v1',
  // Endpoint de chat completions
  chatEndpoint: '/chat/completions',
  // Endpoint de models
  modelsEndpoint: '/models',
  // Usado pelo OpenCode para configurar o provider
  baseUrl: 'https://portal.qwen.ai/v1',
} as const;

// OAuth callback port (para futuro Device Flow no plugin)
export const CALLBACK_PORT = 14561;

// Available Qwen OAuth models for OpenCode
export const QWEN_MODELS = {
  // OAuth aliases confirmed for this plugin
  'coder-model': {
    id: 'coder-model',
    name: 'Qwen Coder (Qwen 3.5 Plus)',
    contextWindow: 1048576,
    maxOutput: 65536,
    description: 'Text-to-text coding model with 1M context and 65,536 max output',
    reasoning: true,
    cost: { input: 0, output: 0 },
  },
  'vision-model': {
    id: 'vision-model',
    name: 'Qwen VL Plus (Vision)',
    contextWindow: 131072, // 128K tokens
    maxOutput: 8192, // 8K tokens
    description: 'Text and image input model with 128K context and 8,192 max output',
    reasoning: false,
    cost: { input: 0, output: 0 },
  },
} as const;
