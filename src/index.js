const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./routes/produtosRouter'));
app.use(require('./routes/usuariosRouter'));
app.use(require('./routes/mesasRouter'));
app.use(require('./routes/formaPagamentoRouter'));
app.use(require('./routes/comandaRouter'));
app.use(require('./routes/itensComandaRouter'));
app.use(require('./routes/relatorioRouter'));

app.listen(3000);
console.log('Server on port 3000')