
# TaxAI – Intelligent Tax Calculator for Brazil

## 🇬🇧 English

TaxAI is a modern web application that uses artificial intelligence to help accountants and companies calculate Brazilian taxes and fees quickly and accurately. The platform provides a user-friendly interface for registering clients, simulating tax scenarios, viewing calculation history, and interacting with an AI-powered fiscal assistant.

### Features

- **Client Registration:** Register individuals or companies with details such as revenue, state, sector, and tax regime.
- **Automated Tax Calculation:** Instantly calculates federal, state, and municipal taxes (IRPJ, CSLL, PIS, COFINS, ICMS, ISS, INSS, etc.) based on client profile and revenue.
- **Calculation History:** View, filter, and search all previous tax simulations for your clients.
- **Results Dashboard:** Visual summary of taxes, estimated values, deadlines, and legal notes.
- **AI Fiscal Chat:** Ask questions and get guidance on tax planning, deadlines, and optimization strategies.
- **Responsive UI:** Modern, mobile-friendly interface with dark mode and accessibility support.

### Technologies

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
- [shadcn/ui](https://ui.shadcn.com/) (UI components)
- [Radix UI](https://www.radix-ui.com/) (accessible primitives)
- [React Router](https://reactrouter.com/) (routing)
- [TanStack Query](https://tanstack.com/query/latest) (data management)

### Getting Started

1. **Clone the repository:**
	```sh
	git clone <YOUR_GIT_URL>
	cd taxai-client-guide
	```
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Run the development server:**
	```sh
	npm run dev
	```
4. **Open in your browser:**
	Visit [http://localhost:5173](http://localhost:5173) (default Vite port).

### Project Structure

- `src/components/` – UI components (forms, dashboard, chat, results, etc.)
- `src/pages/` – Application pages (Dashboard, History, NotFound)
- `src/contexts/` – React context for tax calculations and chat state
- `src/types/` – TypeScript types for clients, taxes, calculations, chat
- `src/utils/` – Tax calculation logic and helpers
- `public/` – Static assets

### Customization & Deployment

- **Styling:** Easily customize colors and themes via `tailwind.config.ts`.
- **Deployment:** Build for production with `npm run build`. Deploy the `dist/` folder to your preferred static host (Vercel, Netlify, etc.).

---

## 🇧🇷 Português

TaxAI é um sistema web moderno que utiliza inteligência artificial para ajudar contadores e empresas a calcular impostos e taxas brasileiras de forma rápida e precisa. A plataforma oferece uma interface intuitiva para cadastro de clientes, simulação de cenários tributários, histórico de cálculos e um chat fiscal com IA.

### Funcionalidades

- **Cadastro de Clientes:** Cadastre pessoas físicas ou jurídicas com dados como receita, estado, setor e regime tributário.
- **Cálculo Automatizado de Impostos:** Calcula instantaneamente tributos federais, estaduais e municipais (IRPJ, CSLL, PIS, COFINS, ICMS, ISS, INSS, etc.) conforme o perfil e receita do cliente.
- **Histórico de Cálculos:** Visualize, filtre e pesquise todas as simulações tributárias já realizadas.
- **Painel de Resultados:** Resumo visual dos impostos, valores estimados, prazos e observações legais.
- **Chat Fiscal com IA:** Tire dúvidas e receba orientações sobre planejamento, prazos e estratégias de otimização tributária.
- **Interface Responsiva:** Design moderno, adaptado para dispositivos móveis, com suporte a dark mode e acessibilidade.

### Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (ferramenta de build)
- [Tailwind CSS](https://tailwindcss.com/) (utilitários de estilo)
- [shadcn/ui](https://ui.shadcn.com/) (componentes de UI)
- [Radix UI](https://www.radix-ui.com/) (primitivas acessíveis)
- [React Router](https://reactrouter.com/) (roteamento)
- [TanStack Query](https://tanstack.com/query/latest) (gerenciamento de dados)

### Como começar

1. **Clone o repositório:**
	```sh
	git clone <SEU_GIT_URL>
	cd taxai-client-guide
	```
2. **Instale as dependências:**
	```sh
	npm install
	```
3. **Inicie o servidor de desenvolvimento:**
	```sh
	npm run dev
	```
4. **Abra no navegador:**
	Acesse [http://localhost:5173](http://localhost:5173) (porta padrão do Vite).

### Estrutura do Projeto

- `src/components/` – Componentes de interface (formulários, dashboard, chat, resultados, etc.)
- `src/pages/` – Páginas da aplicação (Dashboard, Histórico, NotFound)
- `src/contexts/` – Contexto React para cálculos e chat
- `src/types/` – Tipos TypeScript para clientes, impostos, cálculos, chat
- `src/utils/` – Lógica de cálculo de impostos e utilitários
- `public/` – Arquivos estáticos

### Customização & Deploy

- **Estilo:** Personalize facilmente cores e temas em `tailwind.config.ts`.
- **Deploy:** Gere a build de produção com `npm run build`. Faça o deploy da pasta `dist/` em qualquer host estático (Vercel, Netlify, etc.).

---

© 2025 TaxAI. All rights reserved.
