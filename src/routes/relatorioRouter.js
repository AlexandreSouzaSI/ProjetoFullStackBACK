const { Router } = require('express');
const router = Router();


const { getPedidoComida, getPedidoBebida, getTotalDia, getTotalPagar, getTotalProduto, getTotalPorPessoa, getRelarorioPessoa, getRelarorioPreco } = require('../controllers/relatorioController');

router.get('/comidas', getPedidoComida);
router.get('/bebidas', getPedidoBebida);
router.get('/totaldia', getTotalDia);
router.get('/totalpagar', getTotalPagar);
router.post('/totalproduto', getTotalProduto);
router.post('/totalpessoa', getTotalPorPessoa);
router.post('/relatoriopessoa', getRelarorioPessoa);
router.post('/relatoriopreco', getRelarorioPreco);

module.exports = router;