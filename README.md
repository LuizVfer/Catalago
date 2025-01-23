# Catálogo de Produtos

Este é um projeto de catálogo de produtos desenvolvido com Node.js, Express, MySQL e Handlebars. O projeto permite cadastrar, listar, editar e remover produtos de diversas categorias.

## Funcionalidades

- **Cadastrar Produto**: Acesse a página principal para cadastrar um novo produto.
- **Listar Produtos**: Utilize o menu de navegação para listar produtos por categoria.
- **Editar Produto**: Clique no botão "Alterar" em um produto listado para editar suas informações.
- **Remover Produto**: Clique no botão "Remover" em um produto listado para removê-lo do catálogo.

## Estrutura de Arquivos

- **app.js**: Arquivo principal que configura e inicia o servidor Express.
- **bd/conexao_mysql.js**: Configuração da conexão com o banco de dados MySQL.
- **css/estilo.css**: Arquivo de estilos CSS.
- **rotas/produtos_rota.js**: Definição das rotas para manipulação de produtos.
- **servicos/produtos_servicos.js**: Funções de serviço para manipulação de produtos.
- **views/**: Templates Handlebars para renderização das páginas.
- **package.json**: Arquivo de configuração do projeto Node.js.

## Dependências

- express
- express-fileupload
- express-handlebars
- mysql2
- nodemon

## Autor

Luiz

