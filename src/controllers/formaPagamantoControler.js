const pool = require('../infra/database');


const getFormaPagamento = async (req, res) => {
    const response = await pool.query('SELECT * FROM forma_pagamento WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const cadastrarFormaPagamento = async (req, res) => {
    const { descrição } = req.body;
    const response = await pool.query(`INSERT INTO forma_pagamento (descrição, date_create)  
                                       VALUES ($1, $2) returning *`, 
                                       [descrição, date_create = new Date()])
    res.status(201).json({
        message: 'FormaPagamento cadastrado com sucesso!',
        body: {
            FormaPagamento: {descrição, date_create}
        }
    })
};

const deleleFormaPagamento = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('UPDATE forma_pagamento SET date_delete = $1 WHERE id_forma_pagamento = $2', [date_delete = new Date(), id]);
    res.status(204).json(`Mesa ${id} deletado com sucesso!`)
};

const alterarFormaPagamento = async (req, res) => {
    const id = parseInt(req.params.id);
    const { descrição } = req.body;
    const response = await pool.query(`UPDATE forma_pagamento SET descrição = $1, date_update = $2 where id_forma_pagamento = $3 returning *`, 
    [descrição, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getFormaPagamento,
    cadastrarFormaPagamento,
    deleleFormaPagamento,
    alterarFormaPagamento
}