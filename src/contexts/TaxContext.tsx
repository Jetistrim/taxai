import React, { createContext, useContext, useState, useEffect } from 'react';
import { TaxCalculation, ChatMessage } from '@/types/tax';

interface TaxContextType {
  calculations: TaxCalculation[];
  currentCalculation: TaxCalculation | null;
  chatMessages: ChatMessage[];
  addCalculation: (calculation: TaxCalculation) => void;
  setCurrentCalculation: (calculation: TaxCalculation | null) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
}

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export function TaxProvider({ children }: { children: React.ReactNode }) {
  const [calculations, setCalculations] = useState<TaxCalculation[]>([]);
  const [currentCalculation, setCurrentCalculation] = useState<TaxCalculation | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCalculations = localStorage.getItem('taxai-calculations');
    if (savedCalculations) {
      setCalculations(JSON.parse(savedCalculations));
    }
  }, []);

  // Save to localStorage when calculations change
  useEffect(() => {
    localStorage.setItem('taxai-calculations', JSON.stringify(calculations));
  }, [calculations]);

  const addCalculation = (calculation: TaxCalculation) => {
    setCalculations(prev => [calculation, ...prev]);
    setCurrentCalculation(calculation);
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return (
    <TaxContext.Provider value={{
      calculations,
      currentCalculation,
      chatMessages,
      addCalculation,
      setCurrentCalculation,
      addChatMessage,
      clearChat
    }}>
      {children}
    </TaxContext.Provider>
  );
}

export function useTax() {
  const context = useContext(TaxContext);
  if (context === undefined) {
    throw new Error('useTax must be used within a TaxProvider');
  }
  return context;
}