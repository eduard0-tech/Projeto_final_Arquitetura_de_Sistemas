function loggerMiddleware(req, res, next) {
  const inicio = Date.now();

  const envioOriginal = res.json.bind(res);
  res.json = function (corpo) {
    const duracao = Date.now() - inicio;
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duracao}ms)`);
    return envioOriginal(corpo);
  };

  next();
}

module.exports = loggerMiddleware;
