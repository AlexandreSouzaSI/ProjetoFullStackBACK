const pool = require('../infra/database');



const getComanda = async (req, res) => {
    const response = await pool.query('SELECT * FROM comandas WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const cadastrarComanda = async (req, res) => {
    const { id_usuario, id_mesa, id_forma_pagamento, preço_total, taxa_serviço, status_pagamento } = req.body;
    const response = await pool.query(`INSERT INTO comandas (id_usuario, id_mesa, id_forma_pagamento, preço_total, taxa_serviço, status_pagamento, date_create) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`, 
    [id_usuario, id_mesa, id_forma_pagamento, preço_total, taxa_serviço, status_pagamento , date_create = new Date()])
    res.status(201).json({
        message: 'Comanda cadastrado com sucesso!',
        body: {
            Comanda: {id_usuario, id_mesa, id_forma_pagamento, preço_total, taxa_serviço, status_pagamento, date_create}
        }
    })
};

const deleleComanda = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('UPDATE comandas SET date_delete = $1 WHERE id_comanda = $2', [date_delete = new Date(), id]);
    res.status(204).json(`Comanda ${id} deletado com sucesso!`)
};

const alterarComanda = async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_usuario, id_mesa, id_forma_pagamento, preço_total, taxa_serviço, status_pagamento } = req.body;
    const response = await pool.query(`UPDATE comandas 
    SET id_usuario = $1, id_mesa = $2, id_forma_pagamento = $3, preço_total = $4, taxa_serviço = $5, status_pagamento = $6, date_update = $7 where id_comanda = $8 returning *`, 
    [id_usuario, id_mesa, id_forma_pagamento, preço_total, taxa_serviço, status_pagamento, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getComanda,
    cadastrarComanda,
    deleleComanda,
    alterarComanda
}