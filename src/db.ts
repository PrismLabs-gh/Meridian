import Dexie, { Table } from 'dexie';

export interface Chat {
  id: string;
  title: string;
  lastModified: string; // ISO string
}

export interface MessageContentItem {
  type: 'text' | 'image';
  value: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: string;
  content: MessageContentItem[];
}

export class MeridianDB extends Dexie {
  chats!: Table<Chat, string>;
  messages!: Table<Message, string>;

  constructor() {
    super('MeridianDB');
    this.version(1).stores({
      chats: 'id, title, lastModified',
      messages: 'id, chatId, role'
    });
  }
}

export const db = new MeridianDB();
