const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require('./database/question');
const Answer = require('./database/Answer');


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
    ]}).then( answer => {
        res.render("index", {
            answer
        });
    })
});

app.get("/question", (req, res) => {
    res.render("question");
});

app.get("/answer/:id", (req, res) => {
    const id = req.params.id;
    Question.findOne({
        where: { id }
    }).then(question => {
        if(question != undefined){

            Answer.findAll({
                where: {questionId:question.id},
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(answer => {
                res.render("answer", {
                    question,
                    answer
                });

            });

        } else{
            res.redirect("/");
        }
    })
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
});

app.post("/answered", (req, res) => {
    const corpo = req.body.corpo;
    const questionId =  req.body.question;
    Answer.create({
        corpo,
        questionId,
    })
    .then(() => {
        res.redirect(`/answer/${questionId}`);
    });
});


app.listen(3000,()=>{
    console.log("App rodando!");
    console.log("http://localhost:3000");
});
