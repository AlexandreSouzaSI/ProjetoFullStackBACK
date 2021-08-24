const { Router } = require('express');
const router = Router();

const { getFormaPagamento, cadastrarFormaPagamento, deleleFormaPagamento, alterarFormaPagamento } = require('../controllers/formaPagamantoControler');

router.get('/FormaPagamento', getFormaPagamento);
router.post('/FormaPagamento', cadastrarFormaPagamento);
router.delete('/FormaPagamento/:id', deleleFormaPagamento)
router.put('/FormaPagamento/:id', alterarFormaPagamento)

module.exports = router;