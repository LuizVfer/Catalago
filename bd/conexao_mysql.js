//Importa modulo mysql
const mysql = require("mysql2");

//Configuração de conexão
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1819",
    database: "catalago"
});

//teste de conexao
conexao.connect(function (erro) {
    if (erro) throw erro;
    console.log("Conexão efetuada com sucesso!")
});

//Exportar modulo
module.exports = conexao;