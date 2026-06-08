const TarefaService = require('../services/TarefaService');

class TarefaController {

  listar(req, res) {
    try {
      const { concluida, prioridade } = req.query;
      const tarefas = TarefaService.listarTarefas({ concluida, prioridade });
      return res.status(200).json({ sucesso: true, total: tarefas.length, dados: tarefas });
    } catch (erro) {
      return res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor.' });
    }
  }

  buscarPorId(req, res) {
    try {
      const tarefa = TarefaService.buscarPorId(req.params.id);
      return res.status(200).json({ sucesso: true, dados: tarefa });
    } catch (erro) {
      return res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.message });
    }
  }

  criar(req, res) {
    try {
      const novaTarefa = TarefaService.criarTarefa(req.body);
      return res.status(201).json({ sucesso: true, dados: novaTarefa });
    } catch (erro) {
      return res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.message, erros: erro.detalhes || [] });
    }
  }

  atualizar(req, res) {
    try {
      const tarefaAtualizada = TarefaService.atualizarTarefa(req.params.id, req.body);
      return res.status(200).json({ sucesso: true, dados: tarefaAtualizada });
    } catch (erro) {
      return res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.message, erros: erro.detalhes || [] });
    }
  }

  alternarConclusao(req, res) {
    try {
      const tarefa = TarefaService.alternarConclusao(req.params.id);
      return res.status(200).json({ sucesso: true, dados: tarefa });
    } catch (erro) {
      return res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.message });
    }
  }

  remover(req, res) {
    try {
      TarefaService.removerTarefa(req.params.id);
      return res.status(200).json({ sucesso: true, mensagem: 'Tarefa removida com sucesso.' });
    } catch (erro) {
      return res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.message });
    }
  }

  estatisticas(req, res) {
    try {
      const stats = TarefaService.obterEstatisticas();
      return res.status(200).json({ sucesso: true, dados: stats });
    } catch (erro) {
      return res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor.' });
    }
  }
}

module.exports = new TarefaController();
