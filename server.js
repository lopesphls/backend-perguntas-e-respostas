const express = require("express");
const app = express();

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');

app.get("/:nome/:lang",(req, res) => {
    let nome = req.params.nome;
    let lang = req.params.lang;
    let exibirMsg = false;

    let produtos = [
        {nome: "Doritos",preco: 3.14},
        {nome: "Coca-cola",preco:5},
        {nome: "Leite",preco:1.45},
        {nome: "Carne", preco:15},
        {nome: "Redbull", preco: 6},
        {nome: "Nescau", preco: 4}
    ]

    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8040,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(3000,()=>{
    console.log("App rodando!");
    console.log("http://localhost:3000");
});
