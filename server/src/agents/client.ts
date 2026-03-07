// import { createOllama } from "ai-sdk-ollama";
import { google } from '@ai-sdk/google';
import { aisdk } from '@openai/agents-extensions';

// const ollamaClient = createOllama({
//     baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
//     apiKey: 'ollama'
// });

const model = aisdk(google("gemini-3.1-pro-preview"));

export default model;