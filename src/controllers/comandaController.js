const pool = require('../infra/database');
const jwt = require('jsonwebtoken');



const getComanda = async (req, res) => {
    const response = await pool.query('SELECT * FROM comandas WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const getComandaUsuario = async (req, res) => {
    const {id_usuario_cadastrado} = req.body;
    const response = await pool.query(`select 
                                            usuarios_cadastrados.id_usuario_cadastrado,
                                            name,
                                            numero,
                                            produto,
                                            SUM(quantidade * preço) preço_total,
                                            quantidade,
                                            descrição,
                                            preço
                                        from comandas join forma_pagamento ON forma_pagamento.id_forma_pagamento = comandas.id_forma_pagamento
                                        join itens_comanda ON itens_comanda.id_comanda = comandas.id_comanda
                                        join produtos ON produtos.id_produto = itens_comanda.id_produto
                                        join mesas ON mesas.id_mesa = comandas.id_mesa
                                        join usuarios_cadastrados ON usuarios_cadastrados.id_usuario_cadastrado = comandas.id_usuario_cadastrado
                                        WHERE usuarios_cadastrados.id_usuario_cadastrado = $1
                                        GROUP BY usuarios_cadastrados.id_usuario_cadastrado, name, numero, produto, preço_total, quantidade, descrição, preço`, [id_usuario_cadastrado])
    console.log(response.rows)
    res.status(200).json(response.rows);
}

const cadastrarComanda = async (req, res) => {
    const { id_mesa, id_usuario_cadastrado } = req.body;
    let tokenm;
    const response = await pool.query(`INSERT INTO comandas (id_mesa, id_usuario_cadastrado, date_create) 
    VALUES ($1, $2, $3) returning *`, 
    [id_mesa, id_usuario_cadastrado, date_create = new Date()])

        const id_mesas = response.rows[0].id_mesa
        const comanda = response.rows[0].id_comanda
                    const usuarioInfoMesa = {
                        "id_mesa": id_mesas,
                        "id_comanda": comanda
                    }

                    tokenm = jwt.sign(usuarioInfoMesa, process.env.SECRET);
                    console.log(tokenm);
                    res.cookie('tokenm', tokenm, { httpOnly: true});
                    res.status(201).json({
        message: 'Comanda cadastrado com sucesso!',
        body: {
            Comanda: {id_mesa, id_usuario_cadastrado, date_create}
        }
    })
};1

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
    alterarComanda,
    getComandaUsuario
}