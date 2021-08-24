const pool = require('../infra/database');



const getPedidoComida = async (req, res) => {
    const response = await pool.query(`SELECT 
                                        name as Nome,
                                        numero as Mesa,
                                        produto,
                                        quantidade,
                                        preço,
                                        itens_comanda2.date_create 
                                    FROM comandas JOIN usuarios_cadastrados ON usuarios_cadastrados.id_usuario_cadastrado = comandas.id_usuario_cadastrado
                                    JOIN itens_comanda itens_comanda2 ON itens_comanda2.id_comanda = comandas.id_comanda
                                    JOIN produtos ON produtos.id_produto = itens_comanda2.id_produto
                                    JOIN mesas ON mesas.id_mesa = comandas.id_mesa
                                    WHERE itens_comanda2.id_produto != 2 AND itens_comanda2.id_produto != 5
                                    ORDER BY date_create`)
    res.status(200).json(response.rows);
}

const getPedidoBebida = async (req, res) => {
    const response = await pool.query(`SELECT 
                                        name as Nome,
                                        numero as Mesa,
                                        produto,
                                        quantidade,
                                        preço,
                                        itens_comanda2.date_create 
                                    FROM comandas JOIN usuarios_cadastrados ON usuarios_cadastrados.id_usuario_cadastrado = comandas.id_usuario_cadastrado
                                    JOIN itens_comanda itens_comanda2 ON itens_comanda2.id_comanda = comandas.id_comanda
                                    JOIN produtos ON produtos.id_produto = itens_comanda2.id_produto
                                    JOIN mesas ON mesas.id_mesa = comandas.id_mesa
                                    WHERE itens_comanda2.id_produto = 2 OR itens_comanda2.id_produto = 5
                                    ORDER BY date_create`)
    res.status(200).json(response.rows);
};

const getTotalPagar = async (req, res) => {
    const response = await pool.query(`SELECT 
                                        name as Nome,
                                        SUM(preço * quantidade) as Total
                                    FROM comandas JOIN usuarios_cadastrados ON usuarios_cadastrados.id_usuario_cadastrado = comandas.id_usuario_cadastrado
                                    JOIN itens_comanda itens_comanda2 ON itens_comanda2.id_comanda = comandas.id_comanda
                                    JOIN produtos ON produtos.id_produto = itens_comanda2.id_produto
                                    JOIN mesas ON mesas.id_mesa = comandas.id_mesa
                                    GROUP BY nome
                                    ORDER BY nome`)
    res.status(200).json(response.rows);
};

const getTotalDia = async (req, res) => {
    const response = await pool.query(`SELECT 
                                        SUBSTRING(CAST(comandas.date_create AS varchar), 1, 10) as data_pedido,
                                        SUM(preço * quantidade) as Total
                                    FROM comandas JOIN usuarios_cadastrados ON usuarios_cadastrados.id_usuario_cadastrado = comandas.id_usuario_cadastrado
                                    JOIN itens_comanda itens_comanda2 ON itens_comanda2.id_comanda = comandas.id_comanda
                                    JOIN produtos ON produtos.id_produto = itens_comanda2.id_produto
                                    JOIN mesas ON mesas.id_mesa = comandas.id_mesa
                                    GROUP BY data_pedido`)
    res.status(200).json(response.rows);
};

const getTotalProduto = async (req, res) => {
    const { produto } = req.body;
    const response = await pool.query(`SELECT 
                                        SUBSTRING(CAST(comandas.date_create AS varchar), 1, 10) as data_pedido,
                                        produto,
	                                    SUM (quantidade) as quantidade
                                    FROM comandas JOIN usuarios_cadastrados ON usuarios_cadastrados.id_usuario_cadastrado = comandas.id_usuario_cadastrado
                                    JOIN itens_comanda itens_comanda2 ON itens_comanda2.id_comanda = comandas.id_comanda
                                    JOIN produtos ON produtos.id_produto = itens_comanda2.id_produto
                                    JOIN mesas ON mesas.id_mesa = comandas.id_mesa
                                    WHERE produtos.produto = $1
                                    GROUP BY  produto, quantidade, data_pedido
                                    ORDER BY quantidade DESC`, [produto])
    res.status(200).json(response.rows);
};

module.exports = {
    getPedidoComida,
    getPedidoBebida,
    getTotalDia,
    getTotalPagar,
    getTotalProduto
}