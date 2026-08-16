'use client';

import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrainerProfileModal } from '../components/TrainerProfileModal';
import { AiAssistantModal } from '../components/AiAssistantModal';
import { INITIAL_TRAINERS, INITIAL_REQUIREMENTS, INITIAL_CONVERSATIONS } from '../data/mockData';
import { Trainer, Requirement, Conversation } from '../types';

interface AppContextValue {
  trainers: Trainer[];
  requirements: Requirement[];
  conversations: Conversation[];
  activeRequirement: Requirement | null;
  activeConversationId: string;
  shortlistedTrainers: Trainer[];
  toggleShortlist: (trainerId: string) => void;
  addRequirement: (req: Requirement) => void;
  selectRequirement: (req: Requirement) => void;
  selectConversation: (id: string) => void;
  sendMessageToTrainer: (trainerId: string) => void;
  sendChatMessage: (conversationId: string, text: string) => void;
  selectedTrainer: Trainer | null;
  openTrainerProfile: (trainer: Trainer) => void;
  closeTrainerProfile: () => void;
  isAiAssistantOpen: boolean;
  openAiAssistant: () => void;
  closeAiAssistant: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Data state
  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [requirements, setRequirements] = useState<Requirement[]>(INITIAL_REQUIREMENTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeRequirement, setActiveRequirement] = useState<Requirement | null>(INITIAL_REQUIREMENTS[0]);

  // Modal & Selection state
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string>(INITIAL_CONVERSATIONS[0].id);

  const toggleShortlist = useCallback((trainerId: string) => {
    setTrainers(prev => prev.map(t => {
      if (t.id === trainerId) {
        return { ...t, shortlisted: !t.shortlisted };
      }
      return t;
    }));
  }, []);

  const addRequirement = useCallback((newReq: Requirement) => {
    setRequirements(prev => [newReq, ...prev]);
    setActiveRequirement(newReq);
  }, []);

  const selectRequirement = useCallback((req: Requirement) => setActiveRequirement(req), []);

  const selectConversation = useCallback((id: string) => setActiveConversationId(id), []);

  const sendMessageToTrainer = useCallback((trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    if (!trainer) return;

    let existingConv = conversations.find(c => c.trainerId === trainerId);
    if (!existingConv) {
      existingConv = {
        id: `conv-${Date.now()}`,
        trainerId: trainer.id,
        trainerName: trainer.name,
        trainerAvatar: trainer.avatarUrl,
        requirementTitle: activeRequirement?.title || 'General Custom Inquiry',
        lastMessage: 'Hello! I am interested in discussing your training modules.',
        lastTimestamp: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: 'user-1',
            senderName: 'Ritika Mehra',
            senderRole: 'L&D Manager' as const,
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
            text: `Hi ${trainer.name}, we would like to discuss a custom workshop proposal for FinServe Pvt. Ltd.`,
            timestamp: 'Just now',
            isMine: true
          }
        ]
      };
      setConversations(prev => [existingConv!, ...prev]);
      setActiveConversationId(existingConv.id);
    } else {
      setActiveConversationId(existingConv.id);
    }
    router.push('/messages');
  }, [trainers, conversations, activeRequirement, router]);

  const sendChatMessage = useCallback((conversationId: string, text: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          senderId: 'user-1',
          senderName: 'Ritika Mehra',
          senderRole: 'L&D Manager' as const,
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
          text,
          timestamp: 'Just now',
          isMine: true
        };
        return {
          ...conv,
          lastMessage: text,
          lastTimestamp: 'Just now',
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));
  }, []);

  const handleAiGeneratedRequirement = useCallback((newReq: Requirement) => {
    addRequirement(newReq);
    router.push('/experts');
  }, [addRequirement, router]);

  const shortlistedTrainers = useMemo(() => trainers.filter(t => t.shortlisted), [trainers]);

  const value: AppContextValue = {
    trainers,
    requirements,
    conversations,
    activeRequirement,
    activeConversationId,
    shortlistedTrainers,
    toggleShortlist,
    addRequirement,
    selectRequirement,
    selectConversation,
    sendMessageToTrainer,
    sendChatMessage,
    selectedTrainer,
    openTrainerProfile: setSelectedTrainer,
    closeTrainerProfile: () => setSelectedTrainer(null),
    isAiAssistantOpen,
    openAiAssistant: () => setIsAiAssistantOpen(true),
    closeAiAssistant: () => setIsAiAssistantOpen(false)
  };

  return (
    <AppContext.Provider value={value}>
      {children}

      {/* Trainer Profile Drawer / Modal */}
      <TrainerProfileModal
        trainer={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
        onToggleShortlist={toggleShortlist}
        onSendMessage={sendMessageToTrainer}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onGenerated={handleAiGeneratedRequirement}
      />
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
