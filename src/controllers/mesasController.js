const pool = require('../infra/database');


const getMesas = async (req, res) => {
    const response = await pool.query('SELECT * FROM mesas WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const cadastrarMesas = async (req, res) => {
    const { numero } = req.body;
    const response = await pool.query(`INSERT INTO mesas (numero, date_create)  
                                       VALUES ($1, $2) returning *`, 
                                       [numero, date_create = new Date()])
    res.status(201).json({
        message: 'Mesas cadastrado com sucesso!',
        body: {
            mesas: {numero, date_create}
        }
    })
};

const deleleMesas = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('UPDATE mesas SET date_delete = $1 WHERE id_mesa = $2', [date_delete = new Date(), id]);
    res.status(204).json(`Mesa ${id} deletado com sucesso!`)
};

const alterarMesas = async (req, res) => {
    const id = parseInt(req.params.id);
    const { numero } = req.body;
    const response = await pool.query(`UPDATE mesas SET numero = $1, date_update = $2 where id_mesa = $3 returning *`, 
    [numero, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getMesas,
    cadastrarMesas,
    deleleMesas,
    alterarMesas
}