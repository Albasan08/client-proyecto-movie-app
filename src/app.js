//IMPORTACIONES TERCEROS

const express = require("express");
require('dotenv').config()

//uso de express
const app = express()
const port = process.env.port;

//recursos
app.use(express.static(__dirname + "/public"))

//parse application/X-ww-form-urlencoded
//// Parsea datos de formularios (POST) hacia req.body.
app.use(express.urlencoded());

//seteo ingenieria de plantillas
app.set('view engine', 'ejs')
app.set("views", __dirname + "/views");

/* RUTAS */
app.use('/',require("./routes/users.routes.js"));


app.listen(port, () => {
    console.log(`Servidor-front a la escucha del puerto ${port} `);
});