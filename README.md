# Sistema de Tarefas

**Disciplina:** Projeto e Arquitetura de Sistemas  
**Professor:** Américo Sampaio  

Sistema web de gerenciamento de tarefas desenvolvido com arquitetura **MVC + Camadas**, separação **Front-end / Back-end** e **REST API**.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Front-end | React + Vite + Axios |
| Back-end | Node.js + Express |

---

## Arquitetura

O projeto aplica dois padrões arquiteturais exigidos:

### MVC (Model-View-Controller)

| Camada | Localização | Responsabilidade |
|---|---|---|
| Model | `backend/src/models/` | Estrutura da entidade e validações |
| View | `frontend/` | Interface do usuário (React) |
| Controller | `backend/src/controllers/` | Recebe requisições e retorna respostas |

### Camadas (Layers)

```
frontend/          →   View
                         ↕ HTTP (REST API)
src/routes/        →   Roteamento
src/controllers/   →   Controller  (MVC)
src/services/      →   Regras de negócio
src/repositories/  →   Acesso aos dados
src/models/        →   Entidade      (MVC)
```

### Front-Back Separados

O front-end e o back-end são projetos independentes. A comunicação ocorre via HTTP — o React consome a API REST do Express através do Axios.

---

## Estrutura de Pastas

```
projeto-tarefas/
├── backend/
│   └── src/
│       ├── controllers/
│       │   └── TarefaController.js
│       ├── services/
│       │   └── TarefaService.js
│       ├── repositories/
│       │   └── TarefaRepository.js
│       ├── models/
│       │   └── Tarefa.js
│       ├── routes/
│       │   └── tarefaRoutes.js
│       ├── middlewares/
│       │   ├── logger.js
│       │   └── errorHandler.js
│       ├── app.js
│       └── server.js
│
└── frontend/
    └── src/
        ├── pages/
        │   └── Home.jsx
        ├── components/
        │   ├── Header.jsx
        │   ├── Stats.jsx
        │   ├── Filters.jsx
        │   ├── TaskForm.jsx
        │   ├── TaskList.jsx
        │   └── TaskCard.jsx
        └── services/
            └── api.js
```

---

## Como executar

### Pré-requisitos
- Node.js instalado

### 1. Back-end

```bash
cd backend
npm install
npm run dev
```

Roda em: `http://localhost:3000`

### 2. Front-end

Abra um segundo terminal:

```bash
cd frontend
npm install
npm run dev
```

Roda em: `http://localhost:5173`

Acesse **http://localhost:5173** no navegador.

---

## Funcionalidades

- Criar tarefa com título, descrição e prioridade
- Listar todas as tarefas
- Editar tarefa existente
- Marcar tarefa como concluída / desfazer
- Excluir tarefa
- Filtrar por status (concluída / pendente) e prioridade
- Painel de estatísticas (total, concluídas, pendentes)

---

## API REST

Base URL: `http://localhost:3000`

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/stats` | Estatísticas |
| GET | `/tarefas/:id` | Busca por ID |
| POST | `/tarefas` | Cria tarefa |
| PUT | `/tarefas/:id` | Atualiza tarefa |
| PATCH | `/tarefas/:id/concluir` | Alterna status de conclusão |
| DELETE | `/tarefas/:id` | Remove tarefa |

### Filtros disponíveis

```
GET /tarefas?prioridade=alta
GET /tarefas?concluida=false
GET /tarefas?concluida=false&prioridade=alta
```

### Campos da Tarefa

| Campo | Tipo | Obrigatório | Valores |
|---|---|---|---|
| titulo | string | ✅ | máx. 100 caracteres |
| descricao | string | ❌ | qualquer texto |
| concluida | boolean | ❌ | true / false |
| prioridade | string | ❌ | `baixa`, `media`, `alta` |

### Exemplo de resposta

```json
{
  "sucesso": true,
  "total": 1,
  "dados": [
    {
      "id": "abc-123",
      "titulo": "Estudar MVC",
      "descricao": "Revisar o padrão Model-View-Controller",
      "concluida": false,
      "prioridade": "alta",
      "criadaEm": "2026-06-09T10:00:00.000Z",
      "atualizadaEm": "2026-06-09T10:00:00.000Z"
    }
  ]
}
```
