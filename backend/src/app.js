const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.json({
    sucesso: true,
    mensagem: 'API de Tarefas funcionando!',
    versao: '1.0.0',
    endpoints: {
      listar:            'GET    /tarefas',
      buscarPorId:       'GET    /tarefas/:id',
      estatisticas:      'GET    /tarefas/stats',
      criar:             'POST   /tarefas',
      atualizar:         'PUT    /tarefas/:id',
      alternarConclusao: 'PATCH  /tarefas/:id/concluir',
      remover:           'DELETE /tarefas/:id',
    },
  });
});

app.use('/tarefas', tarefaRoutes);

app.use((req, res) => {
  res.status(404).json({ sucesso: false, mensagem: `Rota "${req.originalUrl}" não encontrada.` });
});

app.use(errorHandler);

module.exports = app;
