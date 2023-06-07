const express = require('express');
const bodyparser = require('body-parser');
const routerApi = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 4000;
const hostname = 'localhost';

const app = express();

routerApi(app);

//Middlewares
app.use(bodyparser.json()); //para poder trabajar con json
app.use(bodyparser.urlencoded({ extended: true })); //para poder trabajar con formularios codificados en url
app.use(express.json()); //para poder trabajar con json

app.get('/',(req, res)=>{
    res.status(200).send('Servidor de peliculas')
})

app.listen(port, hostname, ()=>{
    console.log(`El servidor está escuchando en http:${hostname}:${port}`)
})