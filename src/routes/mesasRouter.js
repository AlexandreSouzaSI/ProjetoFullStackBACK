const { Router } = require('express');
const router = Router();

const { getMesas, cadastrarMesas, deleleMesas, alterarMesas } = require('../controllers/mesasController');

router.get('/mesas', getMesas);
router.post('/mesas', cadastrarMesas);
router.delete('/mesas/:id', deleleMesas)
router.put('/mesas/:id', alterarMesas)

module.exports = router;