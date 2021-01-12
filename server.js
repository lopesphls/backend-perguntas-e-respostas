const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.send('Funcionou');
})




app.listen(3000, ()=>{
    console.log('server rodando');
});