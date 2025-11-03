import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTax } from '@/contexts/TaxContext';
import { ChatMessage } from '@/types/tax';

export function ChatBox() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { chatMessages, addChatMessage, currentCalculation } = useTax();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !currentCalculation) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMessage);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message.trim(), currentCalculation);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      addChatMessage(aiMessage);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentCalculation) {
    return null;
  }

  return (
    <Card className="shadow-medium border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>Chat com IA Fiscal</span>
        </CardTitle>
        <CardDescription>
          Refine sua consulta ou tire dúvidas sobre os impostos calculados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="h-64 w-full border border-card-border rounded-lg p-4">
            {chatMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Bot className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm">Faça uma pergunta sobre os impostos calculados</p>
                  <p className="text-xs mt-1">Ex: "Como posso reduzir o IRPJ?"</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${
                      msg.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.type === 'ai' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {msg.type === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-accent text-accent-foreground rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Analisando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple AI response generator for demo purposes
function generateAIResponse(userMessage: string, calculation: any): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('reduzir') || lowerMessage.includes('diminuir') || lowerMessage.includes('economizar')) {
    return `Para reduzir a carga tributária de ${calculation.client.name}, algumas estratégias podem ser consideradas:

1. **Planejamento Tributário**: Revisar o enquadramento fiscal atual
2. **Deduções Legais**: Aproveitar todos os incentivos fiscais disponíveis
3. **Timing**: Organizar receitas e despesas de forma estratégica

Recomendo uma análise mais detalhada com foco no setor de ${calculation.client.sector.toLowerCase()}.`;
  }
  
  if (lowerMessage.includes('prazo') || lowerMessage.includes('quando') || lowerMessage.includes('vencimento')) {
    const proximosPrazos = calculation.taxes.slice(0, 3).map(tax => `• ${tax.name}: ${tax.dueDate}`).join('\n');
    return `Os principais prazos para ${calculation.client.name} são:

${proximosPrazos}

É importante manter um calendário fiscal atualizado para evitar multas e juros.`;
  }
  
  if (lowerMessage.includes('icms') || lowerMessage.includes('iss') || lowerMessage.includes('federal') || lowerMessage.includes('estadual')) {
    return `Baseado no cálculo realizado, os tributos foram categorizados por esfera:

• **Federais**: IRPJ, CSLL, PIS, COFINS
• **Estaduais**: ICMS (quando aplicável)
• **Municipais**: ISS (para prestadores de serviços)

Cada categoria tem suas particularidades e prazos específicos. Posso detalhar alguma categoria específica?`;
  }
  
  if (lowerMessage.includes('simples') || lowerMessage.includes('presumido') || lowerMessage.includes('real')) {
    return `O regime tributário atual (${calculation.client.companyType}) foi considerado no cálculo. 

Algumas observações importantes:
• Cada regime tem alíquotas e regras específicas
• A mudança de regime deve ser avaliada anualmente
• O Simples Nacional pode ser vantajoso para faturamentos menores

Gostaria de simular outros regimes tributários?`;
  }
  
  // Default response
  return `Entendi sua pergunta sobre "${userMessage}". 

Com base no cálculo realizado para ${calculation.client.name}, posso ajudar com:
• Detalhamento de impostos específicos
• Estratégias de planejamento tributário  
• Prazos e obrigações
• Comparação entre regimes

Como posso ser mais específico na sua dúvida?`;
}