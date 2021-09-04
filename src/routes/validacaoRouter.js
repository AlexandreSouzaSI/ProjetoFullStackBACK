const { Router } = require('express');
const router = Router();


const { getValidacao, getValidacaoName, getValidacaoMesa} = require('../controllers/validacaoController');

router.get('/validacao', getValidacao);
router.get('/validacaonome', getValidacaoName);
router.get('/novotoken', getValidacaoMesa);

module.exports = router;