import { streamText, Message } from 'ai'

// Model Providers
import { createOpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenRouter } from '@ai-sdk/openrouter'
import { createGroq } from '@ai-sdk/groq'
import { createMistral } from '@ai-sdk/mistral'

export interface ProviderConfig {
    provider: string;
    apiKey: string;
    baseUrl?: string;
}


export class ModelManager {
    public providerConfig : ProviderConfig;
    public providers: { [key: string]: any };

    constructor() {
        this.providerConfig = {
            provider: 'openai',
            apiKey: "",
            baseUrl: "",
        }

        this.providers = {
            'openai': createOpenAI({
                apiKey: this.providerConfig.apiKey,
                baseUrl: this.providerConfig.baseUrl || 'https://api.openai.com/v1',
            }),
            'google': createGoogleGenerativeAI({
                apiKey: this.providerConfig.apiKey,
                baseUrl: this.providerConfig.baseUrl || "https://generativeai.google.com/api/v1",
            }),
            'anthropic': createAnthropic({
                apiKey: this.providerConfig.apiKey,
                baseUrl: this.providerConfig.baseUrl || "https://api.anthropic.com/",
            }),
            'openrouter': createOpenRouter({
                apiKey: this.providerConfig.apiKey,
                baseUrl: this.providerConfig.baseUrl || "https://openrouter.ai/api/v1",
            }),
            'groq': createGroq({
                apiKey: this.providerConfig.apiKey,
                baseUrl: this.providerConfig.baseUrl || "https://api.groq.com/openai/v1",
            }),
            'mistral': createMistral({
                apiKey: this.providerConfig.apiKey,
                baseUrl: this.providerConfig.baseUrl || "https://api.mistral.ai/v1",
            }),
        }
    }

    getModelInstance(model : string) {
        switch (this.providerConfig.provider) {
            case "openai":
                return this.providers.openai(model);
            case "google":
                return this.providers.google(model);
            case "anthropic":
                return this.providers.anthropic(model);
            case "openrouter":
                return this.providers.openrouter(model);
            case "groq":
                return this.providers.groq(model);
            case "mistral":
                return this.providers.mistral(model);
        }
    }

    streamText(messages: Message[], model : string) {
        const { textStream } = streamText({
            model: this.getModelInstance(model),
            messages: messages,
        })

        return textStream;

    }
}
