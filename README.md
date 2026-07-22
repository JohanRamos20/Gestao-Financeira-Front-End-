# Gestao-Financeira-Front-End

# Finance

Aplicativo de controle financeiro desenvolvido com Expo, React Native e TypeScript. O projeto tem fluxo de autenticação, dashboard com resumo financeiro, gráficos de transações, listagem de movimentações e criação de novas transações integrada a uma API.

## Principais tecnologias

- **Expo**: base do projeto mobile/web, com scripts para Android, iOS e Web.
- **React Native**: construção da interface multiplataforma.
- **React 19**: biblioteca principal para composição dos componentes.
- **TypeScript**: tipagem estática com configuração `strict` ativa.
- **Expo Router**: roteamento baseado em arquivos dentro de `src/app`.
- **React Native Web**: suporte para execução do app no navegador.
- **Zod**: validação e transformação das respostas da API.
- **React Native Gifted Charts**: gráficos de barras e pizza no dashboard.
- **Lucide React Native**: ícones utilizados na interface.
- **Expo Font e Google Fonts**: carregamento das fontes Inter e Fraunces.
- **ESLint com configuração Expo**: padronização e análise estática do código.

## Funcionalidades

- Login e criação de conta.
- Persistência de sessão com token JWT no `localStorage`.
- Encerramento automático da sessão quando o token expira.
- Dashboard com saldo, receitas, despesas e últimas transações.
- Gráficos para visualização de movimentações por tipo e categoria.
- Cadastro de transações com nome, valor, tipo e categoria.
- Consumo de API protegida por token Bearer.
- Tema centralizado por provider e constantes de estilo.

## Estrutura do projeto

```text
src/
  app/                 Rotas do Expo Router
  components/          Componentes reutilizáveis da interface
  constants/           Cores, tema e mapeamentos visuais
  events/              Eventos compartilhados da aplicação
  hooks/               Hooks de autenticação, tema e sistema
  mappers/             Conversores de dados para gráficos e legendas
  providers/           Providers de autenticação e tema
  services/            Camada de comunicação com a API
  styles/              Estilos organizados por área da aplicação
  types/               Tipos de domínio
  utils/               Formatadores e funções auxiliares
  validators/          Schemas Zod para validar respostas externas
```

## Requisitos

- Node.js instalado.
- npm instalado.
- Uma API compatível com as rotas usadas pelo app.

Crie um arquivo de ambiente com a URL da API:

```env
EXPO_PUBLIC_API_URL=http://localhost:3333
```

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o projeto com Expo:

```bash
npm run start
```

Ou execute diretamente em uma plataforma:

```bash
npm run android
npm run ios
npm run web
```

## Scripts disponíveis

- `npm run start`: inicia o servidor do Expo.
- `npm run android`: abre o app no Android.
- `npm run ios`: abre o app no iOS.
- `npm run web`: abre o app na Web.
- `npm run lint`: executa o lint do Expo.

## Integração com API

A comunicação com o backend fica centralizada em `src/services/api.ts`. As requisições usam `EXPO_PUBLIC_API_URL` como base e adicionam automaticamente o token JWT no header `Authorization` quando o usuário está autenticado.

Principais endpoints consumidos:

- `POST /sessions`: login.
- `POST /users`: criação de conta.
- `GET /users/me/wallet/balance`: saldo da carteira.
- `GET /users/me/transactions`: listagem de transações.
- `POST /users/me/transactions`: criação de transação.
