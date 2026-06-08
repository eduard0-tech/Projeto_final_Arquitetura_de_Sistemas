const { v4: uuidv4 } = require('uuid');
const Tarefa = require('../models/Tarefa');

let tarefas = [
  new Tarefa({ id: uuidv4(), titulo: 'Estudar MVC', descricao: 'Revisar o padrão Model-View-Controller', prioridade: 'alta' }),
  new Tarefa({ id: uuidv4(), titulo: 'Fazer trabalho de Arquitetura', descricao: 'Implementar back-end em Node.js', prioridade: 'alta' }),
  new Tarefa({ id: uuidv4(), titulo: 'Revisar REST API', descricao: 'Estudar verbos HTTP e status codes', prioridade: 'media' }),
];

class TarefaRepository {

  findAll({ concluida, prioridade } = {}) {
    let resultado = [...tarefas];

    if (concluida !== undefined) {
      const concluidaBool = concluida === 'true' || concluida === true;
      resultado = resultado.filter(t => t.concluida === concluidaBool);
    }

    if (prioridade) {
      resultado = resultado.filter(t => t.prioridade === prioridade);
    }

    return resultado;
  }

  findById(id) {
    return tarefas.find(t => t.id === id) || null;
  }

  create(dados) {
    const novaTarefa = new Tarefa({ id: uuidv4(), ...dados });
    tarefas.push(novaTarefa);
    return novaTarefa;
  }

  update(id, dados) {
    const index = tarefas.findIndex(t => t.id === id);
    if (index === -1) return null;

    const tarefaAtual = tarefas[index];
    const tarefaAtualizada = new Tarefa({
      ...tarefaAtual,
      ...dados,
      id: tarefaAtual.id,
      criadaEm: tarefaAtual.criadaEm,
      atualizadaEm: new Date().toISOString(),
    });

    tarefas[index] = tarefaAtualizada;
    return tarefaAtualizada;
  }

  delete(id) {
    const index = tarefas.findIndex(t => t.id === id);
    if (index === -1) return false;
    tarefas.splice(index, 1);
    return true;
  }

  getStats() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    return {
      total,
      concluidas,
      pendentes: total - concluidas,
      porPrioridade: {
        alta: tarefas.filter(t => t.prioridade === 'alta').length,
        media: tarefas.filter(t => t.prioridade === 'media').length,
        baixa: tarefas.filter(t => t.prioridade === 'baixa').length,
      },
    };
  }
}

module.exports = new TarefaRepository();
