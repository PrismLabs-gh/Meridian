import Dexie, { Table } from 'dexie';
import { Message } from 'ai';

export interface Model {
    id?: number;
    name: string;
    provider: string;
    modelName: string;
    apiKey: string;
    baseUrl?: string;
    // Other model specific settings
}

export interface Chat {
    id?: number;
    title: string;
    createdAt: Date;
    modelId: number; // FK to Model
}

export interface ChatMessage {
    id?: number;
    chatId: number; // FK to Chat
    message: Message;
    createdAt: Date;
}


export class MyDexie extends Dexie {
    models!: Table<Model>;
    chats!: Table<Chat>;
    chatMessages!: Table<ChatMessage>;

    constructor() {
        super('AIChatDB');
        this.version(1).stores({
            models: '++id, name, provider, modelName',
            chats: '++id, title, createdAt, modelId',
            chatMessages: '++id, chatId, createdAt',
        });
    }
}

export const db = new MyDexie();
