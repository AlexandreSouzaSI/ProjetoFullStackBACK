const { Router } = require('express');
const router = Router();


const { getUsuario, cadastrarUsuario, deleleUsuario, alterarUsuario, loginUsuario } = require('../controllers/usuariosController');

router.get('/Usuarios', getUsuario);
router.post('/login', loginUsuario)
router.post('/Usuarios', cadastrarUsuario);
router.delete('/Usuarios/:id', deleleUsuario)
router.put('/Usuarios/:id', alterarUsuario)

module.exports = router;