function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const mensagem = err.message || 'Erro interno do servidor.';

  console.error(`[ERRO] ${req.method} ${req.originalUrl} → ${status}: ${mensagem}`);

  return res.status(status).json({ sucesso: false, mensagem, erros: err.detalhes || [] });
}

module.exports = errorHandler;
