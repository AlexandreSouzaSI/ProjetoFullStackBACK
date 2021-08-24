const pool = require('../infra/database');



const getUsuario = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios_cadastrados WHERE date_delete is null')
    res.status(200).json(response.rows);
}

const cadastrarUsuario = async (req, res) => {
    const { name, email, telefone, senha } = req.body;
    const response = await pool.query(`INSERT INTO usuarios_cadastrados (name, email, telefone, senha, date_create) 
    VALUES ($1, $2, $3, $4, $5) returning *`, 
    [name, email, telefone, senha , date_create = new Date()])
    res.status(201).json({
        message: 'Usuario cadastrado com sucesso!',
        body: {
            usuario: {name, email, telefone, senha, date_create}
        }
    })
};

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
    alterarUsuario
}