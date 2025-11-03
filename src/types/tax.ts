export interface Client {
  id: string;
  name: string;
  companyType: 'PF' | 'PJ_SIMPLES' | 'PJ_PRESUMIDO' | 'PJ_REAL';
  annualRevenue: number;
  state: string;
  sector: 'COMERCIO' | 'SERVICOS' | 'INDUSTRIA' | 'AGRONEGOCIO';
  referenceDate: string;
  createdAt: string;
}

export interface Tax {
  name: string;
  rate: number;
  estimatedValue: number;
  dueDate: string;
  observations: string;
  type: 'FEDERAL' | 'ESTADUAL' | 'MUNICIPAL';
}

export interface TaxCalculation {
  id: string;
  client: Client;
  taxes: Tax[];
  totalEstimated: number;
  calculatedAt: string;
  summary: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const COMPANY_TYPES = [
  { value: 'PF', label: 'Pessoa Física' },
  { value: 'PJ_SIMPLES', label: 'PJ - Simples Nacional' },
  { value: 'PJ_PRESUMIDO', label: 'PJ - Lucro Presumido' },
  { value: 'PJ_REAL', label: 'PJ - Lucro Real' }
];

export const SECTORS = [
  { value: 'COMERCIO', label: 'Comércio' },
  { value: 'SERVICOS', label: 'Serviços' },
  { value: 'INDUSTRIA', label: 'Indústria' },
  { value: 'AGRONEGOCIO', label: 'Agronegócio' }
];