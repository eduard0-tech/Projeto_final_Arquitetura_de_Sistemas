class Tarefa {
  constructor({ id, titulo, descricao, concluida = false, prioridade = 'media', criadaEm, atualizadaEm }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao || '';
    this.concluida = concluida;
    this.prioridade = prioridade;
    this.criadaEm = criadaEm || new Date().toISOString();
    this.atualizadaEm = atualizadaEm || new Date().toISOString();
  }

  static validar(dados) {
    const erros = [];

    if (!dados.titulo || dados.titulo.trim() === '') {
      erros.push('O campo "titulo" é obrigatório.');
    }

    if (dados.titulo && dados.titulo.length > 100) {
      erros.push('O campo "titulo" deve ter no máximo 100 caracteres.');
    }

    const prioridadesValidas = ['baixa', 'media', 'alta'];
    if (dados.prioridade && !prioridadesValidas.includes(dados.prioridade)) {
      erros.push(`O campo "prioridade" deve ser um dos valores: ${prioridadesValidas.join(', ')}.`);
    }

    return erros;
  }
}

module.exports = Tarefa;
