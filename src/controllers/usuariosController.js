const pool = require('../infra/database');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const autorização = require('../auth/jwtauth')


const getUsuario = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios_cadastrados WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const cadastrarUsuario = async (req, res) => {
    const { name, email, telefone } = req.body;
    const senhaCrypto = await bcrypt.hash(req.body.senha, 10);
    const response = await pool.query(`INSERT INTO usuarios_cadastrados (name, email, telefone, senha, date_create) 
    VALUES ($1, $2, $3, $4, $5) returning *`, 
    [name, email, telefone, senha = senhaCrypto , date_create = new Date()])
    res.status(201).json({
        message: 'Usuario cadastrado com sucesso!',
        body: {
            usuario: {name, email, telefone, senha, date_create}
        }
    })
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    let token;
    const response = await pool.query('SELECT id_usuario_cadastrado, email, senha FROM usuarios_cadastrados WHERE email = $1', [email]);
    const usuarioLogin = response.rows[0].email;
    const senhaLogin = response.rows[0].senha;
    console.log(response.rows)
    bcrypt.compare(senha, senhaLogin, function(err, result){

        if(usuarioLogin == email && result == true){
            const idLogin = response.rows[0].id_usuario_cadastrado;
            const usuarioInfo = {
                "email": usuarioLogin,
                "id": idLogin,
                "admin": false
            }

            token = jwt.sign(usuarioInfo, 'abc123');
            console.log(token);
            res.cookie('token', token, { httpOnly: true});
            res.json(response);
        } else {
            console.log('Usuario ou Senha incorretos');
            res.send('Usuario ou Senha incorretos');
        }
    })
}

const deleleUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('UPDATE usuarios_cadastrados SET date_delete = $1 WHERE id_usuario_cadastrado = $2', [date_delete = new Date(), id]);
    res.status(204).json(`Usuario ${id} deletado com sucesso!`)
};

const alterarUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, telefone } = req.body;
    const response = await pool.query(`UPDATE usuarios_cadastrados 
    SET name = $1, email = $2, telefone = $3 , date_update = $4 where id_usuario_cadastrado = $5 returning *`, 
    [name, email, telefone, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getUsuario,
    cadastrarUsuario,
    deleleUsuario,
    alterarUsuario,
    loginUsuario
}