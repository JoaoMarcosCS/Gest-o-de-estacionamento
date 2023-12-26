require('dotenv').config();

const express = require('express');
const app = express();

const session = require('express-session');//método para inicializarmos as sessões
const connectMongo = require('mongoose');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');
const {messagesGlobal} = require("./src/middlewares/messages");

app.set('views', path.resolve(__dirname, "src", "views"));
app.set('view engine', "ejs");

//conectando com o banco de dados
connectMongo.connect(process.env.CONNECTIONSTRING,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Base de dados conectada ;)");
        app.emit('ok');
    })
    .catch(e => {
        console.log(`Erro na conexão com a base de dados: ${e}`);
    });



//configurando as sessões
const sessionOptions = session({
    secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),//onde serão armazendos os dados da sessão
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());
app.use(express.urlencoded({ extended: true }));//para podermos utilizar o POST, extend:true permite transferencia de
//dados de qualquer tipo
app.use(express.json());//para podermos manipular dados do tipo json nas requisições
app.use(messagesGlobal);
app.use(routes);



app.on('ok', ()=>{
    app.listen(3000, ()=>{
        console.log('Acessar: http://localhost:3000 \nservidor rodando na porta 3000');
    })
})