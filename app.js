//Importar módulo express
const express = require("express");

//Importa modulo fileupload
const fileupload = require("express-fileupload");

//Importa modulo express-handlebars
const { engine } = require("express-handlebars");

//Importa modulo de rotas
const rota_produto = require("./rotas/produtos_rota")


//App
const app = express();

//Habilitando o upload de arquivos
app.use(fileupload());

//Adicionar Bootstraps
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist"));

//Adicionar CSS
app.use('/css', express.static("./css"));

//Referencia a pasta de imageens
app.use("/imagens", express.static("./imagens"));

//Configuração do express-handlebars
app.engine('handlebars', engine({
    helpers: {
      // Função auxiliar para verificar igualdade
      condicionalIgualdade: function (parametro1, parametro2, options) {
        return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
      }
    }
  }));
app.set("view engine", "handlebars");
app.set("views", "./views");

//Manipulaçao de dados via rotas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas
app.use("/", rota_produto);

//Servidor
app.listen(8080);