const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require('./database/question')


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
    Question.findAll({ raw: true , order: [
        ['id', 'DESC'] // ASC = Crescente e DESC = decrescente
    ]}).then( perguntas => {
        res.render("index", {
            perguntas
        });
    })
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/savequestion",(req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    Question.create({
        titulo,
        descricao
    })
    .then(() => {
        res.redirect('/');
    });
})

app.listen(3000,()=>{
    console.log("App rodando!");
    console.log("http://localhost:3000");
});
