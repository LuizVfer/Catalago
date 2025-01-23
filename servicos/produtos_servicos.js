// Importar o módulo de conexão com banco MySQL
const conexao = require('../bd/conexao_mysql');

// Importar o módulo file system
const fs = require('fs');

// Função para exibir o formulário para cadastro de produtos
function formularioCadastro(req, res){
    res.render("formulario");
}

// Função para exibir o formulário para cadastro de produtos e a situação
function formularioCadastroComSituacao(req, res){
    res.render("formulario",{situacao: req.params.situacao });
}

// Função para exibir o formulário para edição de produtos
function formularioEditar(req, res){
        //Sql
        let sql = `SELECT * FROM produtos WHERE codigo = ${req.params.codigo}`;
        //Executar comando sql
        conexao.query(sql, function (erro, retorno) {
            //caso ja falha no comando sql
            if (erro) throw erro;
            //caso não ocorra erro
            res.render("formularioEditar", { produto: retorno[0] });
    
        });
}

// Função para exibir a listagem de produtos
function listagemProdutos(req, res){
        //obter caregoria
        let categoria = req.params.categoria;

        //SQL
        let sql = "";
        if(categoria == "todos"){
            sql = "SELECT * FROM produtos ORDER BY RAND()";
        }else{
            sql = `SELECT * FROM produtos WHERE categoria = '${categoria}' ORDER BY nome ASC`;
        } 
        //Executar comando SQL
        conexao.query(sql, function(erro, retorno) {
            res.render('lista',{produtos:retorno});
        });
}

// Função para realizar a pesquisa de produtos
function pesquisa(req, res){
        //Obter o termo pesquisado
        let termo = req.body.termo;

        //SQL
        let sql = `SELECT * FROM produtos WHERE nome LIKE "%${termo}%"`;
    
        //Executar comandando SQL
        conexao.query(sql, function(erro, retorno) {
    
            let semRegistros = retorno.length == 0 ? true : false;
            res.render('lista',{produtos:retorno, semRegistros:semRegistros});
        });
}

// Função para realizar o cadastro de produtos
function cadastrarProduto(req, res){
    try {
        //Obter os dados que serão utilizados para cadastro
        let nome = req.body.nome;
        let valor = req.body.valor;
        let categoria = req.body.categoria;
        let imagem = req.files.imagem;
        // Validar o nome do produto e o valor
        if (nome == "" || valor == "" || isNaN(valor) || categoria == "") {
            res.redirect("/falhaCadastro");
        } else {
            //SQL
            let sql = `INSERT INTO produtos(nome, valor, imagem, categoria) VALUES('${nome}', ${valor}, '${imagem.name}', '${categoria}')`;
            //excultar comando sql
            conexao.query(sql, function (erro, retorno) {
                //caso ocorra erro
                if (erro) throw erro; {
                    //caso não ocorra erro
                    req.files.imagem.mv(__dirname + "/imagens/" + req.files.imagem.name);
                    console.log(retorno);
                }
            });
            //restorna para a pagina principal
            res.redirect("/okCadastro");
        }
    } catch (erro) {
        res.redirect("/falhaCadastro");
    }
}

// Função para realizar a remoção de produtos
function removerProduto(req, res){
    //tratamento de exceção
    try{   
        //sql
       let sql = `DELETE FROM produtos WHERE codigo = ${req.params.codigo}`;
       //executar comando sql
       conexao.query(sql, function (erro, retorno) {
           //caso ocorra erro
           if (erro) throw erro;
           //caso não ocorra erro
           fs.unlink(__dirname + "/imagens/" + req.params.imagem, (erro_imagem) => {
               console.log("falha ao remover imagem");
           });
       });
       //Redirecionamento
       res.redirect("/okRemover");
   }catch(erro){
       res.redirect("/falhaRemover");

   }
}

// Função responsável pela edição de produtos
function editarProduto(req, res){
    //obter os dados do formulario
    let nome = req.body.nome;
    let valor = req.body.valor;
    let codigo = req.body.codigo;
    let nomeImagem = req.body.nomeImagem;

    //validar nome do produto e valor
    if (nome == "" || valor == "" || isNaN(valor)) {
        res.redirect("/falhaEdicao");
    } else {
        //Definir o tipo de ediçao
        try {
            //objeto de imagem
            let imagem = req.files.imagem;
            //sql
            let sql = `UPDATE produtos SET nome = '${nome}', valor = ${valor}, imagem = '${imagem.name}' WHERE codigo = ${codigo}`;
            //executar comando sql
            conexao.query(sql, function (erro, retorno) {
                //caso falhe o comando sql
                if (erro) throw erro;

                //remover imagem antiga
                fs.unlink(__dirname + "/imagens/" + nomeImagem, (erro_imagem) => {
                    console.log("Falha ao remover imagem");
                });

                //cadastrar nova imagem
                imagem.mv(__dirname + "/imagens/" + imagem.name);
            });

        } catch (erro) {
            //sql 
            let sql = `UPDATE produtos SET nome = '${nome}', valor = ${valor} WHERE codigo = ${codigo}`;

            //executar comando sql
            conexao.query(sql, function (erro, retorno) {
                //caso falhe o comando sql
                if (erro) throw erro;
            });
        }

        //redericionamento
        res.redirect("/okEdicao");
    }
}

// Exportar funções
module.exports = {
    formularioCadastro,
    formularioCadastroComSituacao,
    formularioEditar,
    listagemProdutos,
    pesquisa,
    cadastrarProduto,
    removerProduto,
    editarProduto
};