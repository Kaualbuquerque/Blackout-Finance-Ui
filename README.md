# Frontend Documentation

Este documento descreve todos os aspectos do front-end do projeto **Blackout Finance**, incluindo tecnologias, componentes, estilo e fluxos de trabalho.

---

## 1. Visão Geral

* **Propósito**: Interface do usuário para o sistema de finanças pessoais Blackout Finance, permitindo cadastro/login, visualização de entradas/saídas, gráficos e histórico de transações.
* **Tecnologias principais**:

  * **React** com TypeScript (arquivos `.tsx`)
  * **HTML** e **CSS** (com módulos CSS para escopo local de estilos)
  * **Ferramenta de build**: Vite (ou CRA conforme configuração do projeto)
* **Gerenciamento de requisições**:

  * Arquivo `API.ts` centraliza chamadas HTTP (`fetch`/`axios`) e contém interfaces TypeScript para tipagem de dados.

---

## 2. Pré-requisitos

* **Node.js** (versão 16 ou superior)
* **npm** (versão 8+) ou **Yarn**


---

## 3. Instalação e Execução

No diretório `frontend/`:

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## 4. Estrutura de Diretórios

```text
Blackout UI/                           # raiz do frontend
├── src/
│   ├── assets/                        # imagens, ícones, fontes
│   │    └── ...
│   ├── components/                    # componentes React
│   │    ├── Navbar/
│   │    ├── Footer/
│   │    ├── Card/
│   │    ├── TotalFinances/
│   │    ├── AddTransaction/
│   │    ├── ErrorMessage/
│   │    ├── HistoryList/
│   │    ├── EntryHistory/
│   │    └── Graphic/
│   ├── services/                      # lógica de requisições (API.ts)
│   │    └── API.ts
│   ├── App.tsx                        # componente raiz
│   ├── main.tsx                       # ponto de entrada (renderização React)
│   ├── index.css                      # estilos globais
│   ├── declarations.d.ts              # declarações customizadas TypeScript
│   └── env.d.ts                       # tipos para variáveis de ambiente
└── tsconfig.json                      # configurações TypeScript
```

---

## 5. Componentes Principais

### API.ts

O arquivo **API.ts** abstrai todas as chamadas HTTP (GET, POST e DELETE) para o backend e define as interfaces TypeScript (`User`, `Transaction`, `AuthResponse` etc.), garantindo tipagem segura e consistente na troca de dados entre o front-end e o servidor.

### Navbar

A **Navbar** é o cabeçalho fixo presente em todas as páginas. Nele, exibe-se o nome do projeto **Blackout Finance**, um botão de alternância de tema (claro/escuro) e um espaço que muda dinamicamente: quando o usuário não está autenticado, há um botão que direciona para a tela de login; após o login, exibe o e‑mail do usuário logado.

### Footer

O **Footer** aparece em todas as telas e reúne links para redes sociais, formas de contato e suporte ao cliente. Embora os links sejam fictícios (por se tratar de um projeto acadêmico), eles simulam a experiência de um ambiente de produção, reforçando a consistência visual e de navegação.

### Card

O componente **Card** serve para destacar informações na página inicial “Blackout”. Cada card recebe um título, uma descrição seguindo um design com bordas arredondadas, sombra discreta e espaçamento interno padronizado para manter a harmonia visual.

### TotalFinances

O **TotalFinances** apresenta o saldo agregado das transações do usuário. Caso o tipo seja "Entrada", o número aparece em verde (representando entradas); se for do tipo "Saída", fica em vermelho (representando saídas). Esse feedback colorido ajuda o usuário a identificar rapidamente sua situação financeira.

### AddTransaction

**AddTransaction** é o formulário responsável por cadastrar novas transações. Ele contém campos de valor, tipo (entrada/saída), descrição, data, hora e categoria. Em caso de erro de validação ou falha na requisição, o componente **ErrorMessage** é acionado para exibir a mensagem de erro correspondente.

### ErrorMessage

O **ErrorMessage** é acionado dentro de formulários para exibir de forma clara e destacada erros de validação ou de comunicação com o backend. A mensagem é apresentada em um estilo diferenciado, em vermelho, para chamar a atenção do usuário.

### HistoryList

O **HistoryList** recebe um array de transações e renderiza, para cada item, um **EntryHistory**. Ele organiza os registros em forma de lista, facilitando a leitura.

### EntryHistory

O **EntryHistory** mostra os detalhes de cada transação — tipo, valor, descrição e data — e inclui um ícone de lixeira que, ao ser clicado, exclui a transação correspondente, atualizando tanto a interface quanto o backend.

### Graphic

O componente **Graphic** gera gráficos das transações agrupadas por hora, dia ou mês. Utilizando a biblioteca Chart.js, ele recebe os dados formatados, produzindo visualizações em barras que auxiliam o usuário na análise temporal de suas movimentações.

## 6. Style Guide. Style Guide. Style Guide Style Guide

* **Nomenclatura**:

  * Componentes em PascalCase (`MyComponent.tsx`)
  * Classes CSS com módulos (`ComponentName.module.css`)
* **Arquivos de estilo**: escopo local por componente

---

## 8. Build e Deploy

* **Fluxo de branches**: GitHub Flow
* **CI/CD**: Vercel (deploy automático em `main`)
* **Comando de deploy**: configurado no dashboard do Vercel

---

## 9. Equipe

01535268 – Amanda Luana Santos Alves

01511663 - Gabriella Lacerda Chaves Korinfsky

01558846 - João Arthur Duarte de Faria

01512676 - José Hugo Chaves Filho

01553544 - José William Guilherme Santos

01516413 - Kauã Albuquerque Xavier de Farias

---

*Esta documentação será atualizada conforme novas funcionalidades e alterações no projeto.*