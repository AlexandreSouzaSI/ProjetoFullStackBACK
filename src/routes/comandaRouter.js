const { Router } = require('express');
const router = Router();


const { getComanda, cadastrarComanda, deleleComanda, alterarComanda, getComandaUsuario } = require('../controllers/comandaController');

router.get('/Comanda', getComanda);
router.post('/Comanda', cadastrarComanda);
router.delete('/Comanda/:id', deleleComanda)
router.put('/Comanda/:id', alterarComanda)
router.post('/comandapessoa', getComandaUsuario)

module.exports = router;