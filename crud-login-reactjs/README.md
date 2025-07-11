# 🧠 Sistema de Login + Lista de Tarefas em React / Next.js

Este projeto é um sistema simples de **autenticação com cadastro e login**, integrado a uma **lista de tarefas (ToDo List)**. Ideal para aprender na prática como funcionam fluxos de autenticação no front-end e manipulação de estado com `useReducer` e `localStorage`.

---

## 🧪 Tecnologias Utilizadas

- ⚛️ [React](https://react.dev/)
- ⏳ [Next.js (App Router)](https://nextjs.org/docs/app)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- 💨 [Tailwind CSS](https://tailwindcss.com/)
- 🗂️ `localStorage` (armazenamento local do navegador)

---

## 🔐 Funcionalidades

### ✅ Login / Cadastro
- Validação de campos obrigatórios
- Confirmação de senha
- Verificação de email já existente
- Armazenamento seguro das contas no `localStorage`
- Redirecionamento automático após login
- Feedback visual de sucesso ou erro

### 📝 Lista de Tarefas
- Adição de tarefas com Enter ou botão
- Marcar/desmarcar como concluída
- Deletar tarefa individual
- Limpar todas as tarefas (com confirmação)
- Mensagem especial quando todas as tarefas são concluídas
- Persistência das tarefas na sessão

---

## 🧠 O que aprendi

Durante o desenvolvimento deste projeto, aprendi a:

- Criar um sistema completo de **login/cadastro** sem backend, usando `localStorage`
- Validar formulários e dar feedback visual ao usuário (erros e sucessos)
- Utilizar **`useReducer`** para gerenciar uma lista de tarefas de forma organizada e escalável
- Implementar **modais personalizados** (confirmação de exclusão, sucesso)
- Trabalhar com **`useRef`** para foco automático e controle de estados anteriores
- Usar navegação programada com `useRouter()` do Next.js App Router
- Utilizar **Tailwind CSS** para estilizar rapidamente com classes utilitárias
- Pensar na **experiência do usuário (UX)** em pequenos detalhes

---

## 📷 Imagens do Projeto

### Tela de Login
![Login](assets/login.png)

### Tela de Cadastro
![Cadastro](assets/cadastro.png)

### Lista de Tarefas
![ToDo](assets/task.png)

---

## 📦 Como rodar o projeto

- npm run dev
