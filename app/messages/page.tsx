'use client';

import { MessagesView } from '@/src/components/MessagesView';
import { useApp } from '@/src/context/AppContext';

export default function MessagesPage() {
  const { conversations, activeConversationId, selectConversation, sendChatMessage } = useApp();

  return (
    <MessagesView
      conversations={conversations}
      activeConversationId={activeConversationId}
      onSelectConversation={selectConversation}
      onSendMessage={sendChatMessage}
    />
  );
}
