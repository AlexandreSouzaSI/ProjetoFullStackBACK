const pool = require('../infra/database');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');


const getUsuario = async (req, res) => {

            try {
                const response = await pool.query('SELECT * FROM usuarios_cadastrados WHERE date_delete is null')
                res.status(200).json(response.rows);
                } catch (e) {
                console.log(e);
            }

}

const cadastrarUsuario = async (req, res) => {
    const { name, email, telefone, admin } = req.body;

    const compare = await pool.query(`SELECT * FROM usuarios_cadastrados WHERE email = $1`, [email])


    if (compare.rowCount === 1 || compare.rowCount > 1) {
        console.log("Email já cadastrado")
        res.json(0)
    }
    
    else if (compare.rowCount === 0) {
    const senhaCrypto = await bcrypt.hash(req.body.senha, 10);
    const response = await pool.query(`INSERT INTO usuarios_cadastrados (name, email, telefone, senha, admin, date_create) 
    VALUES ($1, $2, $3, $4, $5, $6) returning *`, 
    [name, email, telefone, senha = senhaCrypto, admin, date_create = new Date()])
    res.status(201).json({
        message: 'Usuario cadastrado com sucesso!',
        body: {
            usuario: {name, email, telefone, senha, admin, date_create}
        }
    })
    }
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    console.log(email)
    res.clearCookie('token');
    let token;

    
    const response = await pool.query('SELECT id_usuario_cadastrado, email, senha, name, telefone FROM usuarios_cadastrados WHERE email = $1', [email]);

    if (response.rowCount === 0) {
        console.log("Email ou senha incorretos")
        res.json(0)
    } else {

    const usuarioLogin = response.rows[0].email;
    const senhaLogin = response.rows[0].senha;

    bcrypt.compare(senha, senhaLogin, function(err, result) {

        if(usuarioLogin == email && result == true){
            const idLogin = response.rows[0].id_usuario_cadastrado;
            const NomeUser = response.rows[0].name;
            const NomeTel = response.rows[0].telefone;
            const usuarioInfo = {
                "telefone": NomeTel,
                "name": NomeUser,
                "email": usuarioLogin,
                "id": idLogin,
                "admin": false
            }

            token = jwt.sign(usuarioInfo, process.env.SECRET);
            console.log(token);
            res.cookie('token', token, { httpOnly: true});
            res.json(usuarioLogin);
        } else {
            console.log("Email ou senha incorretos")
            res.json(0) 
        } 
    });   
}
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
    loginUsuario,
}