const { Router } = require('express');
const router = Router();


const { getItensComanda, cadastrarItensComanda, deleleItensComanda, alterarItensComanda } = require('../controllers/itensComandaController');

router.get('/ItensComanda', getItensComanda);
router.post('/ItensComanda', cadastrarItensComanda);
router.delete('/ItensComanda/:id', deleleItensComanda)
router.put('/ItensComanda/:id', alterarItensComanda)

module.exports = router;