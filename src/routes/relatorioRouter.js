const { Router } = require('express');
const router = Router();


const { getPedidoComida, getPedidoBebida, getTotalDia, getTotalPagar, getTotalProduto } = require('../controllers/relatorioController');

router.get('/comidas', getPedidoComida);
router.get('/bebidas', getPedidoBebida);
router.get('/totaldia', getTotalDia);
router.get('/totalpagar', getTotalPagar);
router.post('/totalproduto', getTotalProduto);

module.exports = router;