const pool = require('../infra/database');


const getProdutos = async (req, res) => {
    const response = await pool.query('SELECT * FROM produtos WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const cadastrarProduto = async (req, res) => {
    const { produto, preço } = req.body;
    const response = await pool.query(`INSERT INTO produtos (produto, preço, date_create) VALUES ($1, $2, $3) returning *`, 
    [produto, preço, date_create = new Date()])
    res.status(201).json({
        message: 'Produto cadastrado com sucesso!',
        body: {
            produto: {produto, preço, date_create}
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
    const { produto, preço } = req.body;
    const response = await pool.query(`UPDATE produtos 
    SET produto = $1, preço = $2, date_update = $3 where id_produto = $4 returning *`, 
    [produto, preço, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getProdutos,
    cadastrarProduto,
    deleleProduto,
    alterarProduto
}