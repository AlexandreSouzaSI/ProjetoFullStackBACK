const pool = require('../infra/database');
const jwt = require('jsonwebtoken');


const getProdutos = async (req, res) => {

    const token = req.cookies['token']

    console.log(token)

    console.log('get', token);
    jwt.verify(token, process.env.SECRET, async (err, tokenUsuario) => {

        if (err) {
            return res.sendStatus(403);
        } else {
            userEmail = tokenUsuario.email;
            userId = tokenUsuario.id;
            userAdmin = tokenUsuario.admin;

            try {

                const response = await pool.query('SELECT * FROM produtos WHERE date_delete is null')
                console.log(userEmail, userId, userAdmin);
                console.log(response.rows)
                res.status(200).json(response.rows);

            } catch (e) {
                console.log(e);
            }

            return true;
        }
    })
}

const cadastrarProduto = async (req, res) => {
    const { produto, preco } = req.body;
    const response = await pool.query(`INSERT INTO produtos (produto, preco, date_create) VALUES ($1, $2, $3) returning *`, 
    [produto, preco, date_create = new Date()])
    res.status(201).json({
        message: 'Produto cadastrado com sucesso!',
        body: {
            produto: {produto, preco, date_create}
        }
    })
};

const deleleProduto = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('UPDATE produtos SET date_delete = $1 WHERE id_produto = $2', [date_delete = new Date(), id]);
    res.status(204).json(`Produto ${id} deletado com sucesso!`)
};

const alterarProduto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { produto, preco } = req.body;
    const response = await pool.query(`UPDATE produtos 
    SET produto = $1, preco = $2, date_update = $3 where id_produto = $4 returning *`, 
    [produto, preco, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getProdutos,
    cadastrarProduto,
    deleleProduto,
    alterarProduto
}