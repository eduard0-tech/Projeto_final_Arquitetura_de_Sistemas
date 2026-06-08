const TarefaRepository = require('../repositories/TarefaRepository');
const Tarefa = require('../models/Tarefa');

class TarefaService {

  listarTarefas(filtros = {}) {
    return TarefaRepository.findAll(filtros);
  }

  buscarPorId(id) {
    const tarefa = TarefaRepository.findById(id);
    if (!tarefa) {
      const erro = new Error(`Tarefa com id "${id}" não encontrada.`);
      erro.status = 404;
      throw erro;
    }
    return tarefa;
  }

  criarTarefa(dados) {
    const erros = Tarefa.validar(dados);
    if (erros.length > 0) {
      const erro = new Error('Dados inválidos.');
      erro.status = 400;
      erro.detalhes = erros;
      throw erro;
    }
    return TarefaRepository.create(dados);
  }

  atualizarTarefa(id, dados) {
    this.buscarPorId(id);

    if (dados.titulo !== undefined || dados.prioridade !== undefined) {
      const erros = Tarefa.validar({ titulo: dados.titulo || 'placeholder', ...dados });
      if (erros.length > 0) {
        const erro = new Error('Dados inválidos.');
        erro.status = 400;
        erro.detalhes = erros;
        throw erro;
      }
    }

    return TarefaRepository.update(id, dados);
  }

  alternarConclusao(id) {
    const tarefa = this.buscarPorId(id);
    return TarefaRepository.update(id, { concluida: !tarefa.concluida });
  }

  removerTarefa(id) {
    this.buscarPorId(id);
    TarefaRepository.delete(id);
  }

  obterEstatisticas() {
    return TarefaRepository.getStats();
  }
}

module.exports = new TarefaService();
