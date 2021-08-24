const { Router } = require('express');
const router = Router();


const { getProdutos, cadastrarProduto, deleleProduto, alterarProduto } = require('../controllers/produtoController');

router.get('/produtos', getProdutos);
router.post('/produtos', cadastrarProduto);
router.delete('/produtos/:id', deleleProduto)
router.put('/produtos/:id', alterarProduto)

module.exports = router;