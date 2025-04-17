import React, { useEffect, useState, useCallback } from 'react';
import { db, Chat, Message, MessageContentItem } from '../../db';
import Messages from '../Messages/Messages';
import { Composer } from '../Composer/Composer';
import { v4 as uuidv4 } from 'uuid';

interface ChatWrapperProps {
  chatId?: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ chatId: initialChatId }) => {
  const [chatId, setChatId] = useState<string | undefined>(initialChatId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);

  // Load chat and messages
  useEffect(() => {
    if (!chatId) return;
    db.chats.get(chatId).then(setChat);
    db.messages.where('chatId').equals(chatId).toArray().then(setMessages);
  }, [chatId]);

  // Create a new chat if none exists
  useEffect(() => {
    if (!chatId) {
      const newId = uuidv4();
      const now = new Date().toISOString();
      const newChat: Chat = {
        id: newId,
        title: 'New Chat',
        lastModified: now
      };
      db.chats.add(newChat).then(() => {
        setChatId(newId);
        setChat(newChat);
      });
    }
  }, [chatId]);

  // Send message handler
  // Accepts just content array, role is always 'user' for now
  const handleSendMessage = useCallback(async (content: MessageContentItem[]) => {
    if (!chatId) return;
    const newMsg: Message = {
      id: uuidv4(),
      chatId,
      role: 'user',
      content
    };
    await db.messages.add(newMsg);
    setMessages((prev) => [...prev, newMsg]);
    // Update chat last modified
    const now = new Date().toISOString();
    await db.chats.update(chatId, { lastModified: now });
    setChat((prev) => prev && { ...prev, lastModified: now });
  }, [chatId]);

  return (
    <div className="chat-wrapper">
      <div className="chat-title">{chat?.title || 'Loading...'}</div>
      <Messages messages={messages} />
      <Composer onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWrapper;
