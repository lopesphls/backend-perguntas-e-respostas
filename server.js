const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");


connection
    .authenticate()
    .then(() => {
        console.log('Conexão com Banco concluida');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/savequestion",(req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    res.send(`Formulário recebido com titulo ${titulo} e com descrição ${descricao}`);
})

app.listen(3000,()=>{
    console.log("App rodando!");
    console.log("http://localhost:3000");
});
