const pool = require('../infra/database');


const getItensComanda = async (req, res) => {
    const response = await pool.query('SELECT * FROM itens_comanda WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const cadastrarItensComanda = async (req, res) => {
    const { id_comanda, id_produto, quantidade } = req.body;
    const response = await pool.query(`INSERT INTO itens_comanda (id_comanda, id_produto, quantidade, date_create) 
    VALUES ($1, $2, $3, $4) returning *`, 
    [id_comanda, id_produto, quantidade, date_create = new Date()])
    res.status(201).json({
        message: 'ItensComanda cadastrado com sucesso!',
        body: {
            ItensComanda: {id_comanda, id_produto, quantidade, date_create}
        }
    })
};

const deleleItensComanda = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query(`UPDATE itens_comanda SET date_delete = $1, id_produto = $2 WHERE id_comanda = $3`, [date_delete = new Date(), id_produto, id]);
    res.status(204).json(`ItensComanda ${id} deletado com sucesso!`)
};

const alterarItensComanda = async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_comanda, id_produto, quantidade } = req.body;
    const response = await pool.query(`UPDATE itens_comanda 
    SET id_comanda = $1, id_produto = $2, quantidade = $3, date_update = $4 where id_comanda = $5 returning *`, 
    [id_comanda, id_produto, quantidade, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getItensComanda,
    cadastrarItensComanda,
    deleleItensComanda,
    alterarItensComanda
}