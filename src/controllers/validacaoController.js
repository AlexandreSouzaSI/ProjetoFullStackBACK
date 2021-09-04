const pool = require('../infra/database');
const jwt = require('jsonwebtoken');


const getValidacao = async (req, res) => {

    const token = req.cookies['token']

    console.log(token)

    console.log('get', token);
    jwt.verify(token, process.env.SECRET, async (err, tokenUsuario) => {

        if (err) {
            return res.sendStatus(403);
        } else {
            telefone = tokenUsuario.telefone;
            user = tokenUsuario.name;
            userEmail = tokenUsuario.email;
            userId = tokenUsuario.id_usuario_cadastrado;
            userAdmin = tokenUsuario.admin;

            try {

                const response = await pool.query('SELECT * FROM usuarios_cadastrados WHERE date_delete is null')
                console.log(userEmail, userId, userAdmin, user, telefone);
                res.status(200).json(response.rows);

                if (response.rows[0].userAdmin == true){
                    res.json(0)
                }

            } catch (e) {
                console.log(e);
            }

            return true;
        }
    })
}

const getValidacaoName = async (req, res) => {

    const token = req.cookies['token']

    console.log(token)

    console.log('get', token);
    jwt.verify(token, process.env.SECRET, async (er, tokenUsuario) => {

        if (er) {
            return res.sendStatus(403);
        } else {
            telefone = tokenUsuario.telefone;
            user = tokenUsuario.name;
            userEmail = tokenUsuario.email;
            userId = tokenUsuario.id;
            userAdmin = tokenUsuario.admin;

            try {

                const response = await pool.query('SELECT name, email, telefone, id_usuario_cadastrado FROM usuarios_cadastrados WHERE id_usuario_cadastrado = $1', [userId])
                console.log(userEmail, userId, userAdmin, user, telefone);
                res.status(200).json(response.rows);

            } catch (e) {
                console.log(e);
            }
            return true;
        }
    })
}

const getValidacaoMesa = async (req, res) => {

    const tokenm = req.cookies['tokenm']

    console.log(tokenm)

    console.log('get', tokenm);
    jwt.verify(tokenm, process.env.SECRET, async (err, tokenMesa) => {

        if (err) {
            return res.sendStatus(403);
        } else {
            mesa = tokenMesa.id_mesa;
            comanda = tokenMesa.id_comanda;
            try {
                const response = await pool.query('SELECT id_comanda, id_mesa FROM comandas WHERE id_comanda = $1', [comanda])
                console.log(mesa, comanda);
                res.status(200).json(response.rows);

            } catch (e) {
                console.log(e);
            }
        }
    })
}

module.exports = {
    getValidacao,
    getValidacaoName,
    getValidacaoMesa
}