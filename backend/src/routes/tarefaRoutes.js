const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

router.get('/stats', TarefaController.estatisticas.bind(TarefaController));
router.get('/', TarefaController.listar.bind(TarefaController));
router.get('/:id', TarefaController.buscarPorId.bind(TarefaController));
router.post('/', TarefaController.criar.bind(TarefaController));
router.put('/:id', TarefaController.atualizar.bind(TarefaController));
router.patch('/:id/concluir', TarefaController.alternarConclusao.bind(TarefaController));
router.delete('/:id', TarefaController.remover.bind(TarefaController));

module.exports = router;
