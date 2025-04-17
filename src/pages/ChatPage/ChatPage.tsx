import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, Chat, Message, MessageContentItem } from '../../db';
import Messages from '../../components/Messages/Messages';
import { Composer } from '../../components/Composer/Composer';
import { v4 as uuidv4 } from 'uuid';

const ChatPage: React.FC = () => {
  const { chatId: routeChatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const [chatId, setChatId] = useState<string | undefined>(routeChatId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);

  // If no chatId in URL, create a new chat and redirect
  useEffect(() => {
    if (!routeChatId) {
      const newId = uuidv4();
      const now = new Date().toISOString();
      const newChat: Chat = {
        id: newId,
        title: 'New Chat',
        lastModified: now
      };
      db.chats.add(newChat).then(() => {
        navigate(`/chat/${newId}`, { replace: true });
      });
    } else {
      setChatId(routeChatId);
    }
  }, [routeChatId, navigate]);

  // Load chat and messages
  useEffect(() => {
    if (!chatId) return;
    db.chats.get(chatId).then(setChat);
    db.messages.where('chatId').equals(chatId).toArray().then(setMessages);
  }, [chatId]);

  // Send message handler
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
    <div className="chat-page">
      <div className="chat-wrapper">
        <div className="chat-title">{chat?.title || 'Loading...'}</div>
        <Messages messages={messages} />
        <Composer onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
