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

const getTotalPorPessoa = async (req, res) => {
    const { id } = req.body;
    const response = await pool.query(`select 
                                        SUBSTRING(CAST(comandas2.date_create AS varchar), 1, 10) as data_pedido,
                                        name,
                                        produto,
                                        quantidade,
                                        preço,
                                        SUM(quantidade * preço) Total
                                    from itens_comanda JOIN produtos produtos2 ON produtos2.id_produto = itens_comanda.id_produto
                                    JOIN comandas comandas2 ON comandas2.id_comanda = itens_comanda.id_comanda
                                    JOIN usuarios_cadastrados usuarios_cadastrados2 ON usuarios_cadastrados2.id_usuario_cadastrado = comandas2.id_usuario_cadastrado
                                    WHERE usuarios_cadastrados2.id_usuario_cadastrado = $1
                                    Group BY name, produto, quantidade, preço, comandas2.date_create`, [id])
    res.status(200).json(response.rows);
};

const getRelarorioPessoa = async (req, res) => {
    const { id_usuario_cadastrado } = req.body;
    const response = await pool.query(`select 
                                        produtos.name,
                                        numero,
                                        SUM(quantidade * preco) preco_total,
                                        preco,
                                        SUM(quantidade) quantidade
                                    FROM usuarios_cadastrados
                                    JOIN comandas comandas2 ON comandas2.id_usuario_cadastrado = usuarios_cadastrados.id_usuario_cadastrado
                                    JOIN mesas mesas2 ON mesas2.id_mesa = comandas2.id_mesa
                                    JOIN itens_comanda ON itens_comanda.id_comanda = comandas2.id_comanda
                                    JOIN produtos ON produtos.id_produto = itens_comanda.id_produto WHERE usuarios_cadastrados.id_usuario_cadastrado = $1
                                    GROUP BY produtos.name, numero, preco, quantidade`, [id_usuario_cadastrado])
                                    console.log(response.rows)
    res.status(200).json(response.rows);
};

const getRelarorioPreco = async (req, res) => {
    const { id_usuario_cadastrado } = req.body;
    const response = await pool.query(`select 
                                        
                                            SUM(preco_total) as total
                                        from (
                                        select 
                                            produtos.name,
                                            numero,
                                            SUM(quantidade * preco) preco_total,
                                            SUM(preco_total),
                                            preco,
                                            SUM(quantidade) quantidade
                                        FROM usuarios_cadastrados
                                        JOIN comandas comandas2 ON comandas2.id_usuario_cadastrado = usuarios_cadastrados.id_usuario_cadastrado
                                        JOIN mesas mesas2 ON mesas2.id_mesa = comandas2.id_mesa
                                        JOIN itens_comanda ON itens_comanda.id_comanda = comandas2.id_comanda
                                        JOIN produtos ON produtos.id_produto = itens_comanda.id_produto WHERE usuarios_cadastrados.id_usuario_cadastrado = $1
                                        GROUP BY produtos.name, numero, preco
                                            ) as Soma
                                            `, [id_usuario_cadastrado])
                                            console.log(response.rows)
    res.status(200).json(response.rows);
};

module.exports = {
    getPedidoComida,
    getPedidoBebida,
    getTotalDia,
    getTotalPagar,
    getTotalProduto,
    getTotalPorPessoa,
    getRelarorioPessoa,
    getRelarorioPreco
}