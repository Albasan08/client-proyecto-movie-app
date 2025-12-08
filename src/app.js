//IMPORTACIONES TERCEROS

const express = require("express");
require("dotenv").config();
const cookieParser = require('cookie-parser');


//uso de express
const app = express();
const PORT = process.env.PORT;

//uso del methodOverride
//const methodOverride = require('method-override');

//recursos
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

//parse application/X-ww-form-urlencoded
//// Parsea datos de formularios (POST) hacia req.body.
app.use(express.urlencoded());

//seteo ingenieria de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

/* RUTAS */
app.use("/", require("./routes/users.routes.js"));
app.use("/movies", require("./routes/admin.routes.js"));

//app.use(methodOverride('_method'));

app.listen(PORT, () => {
    console.log(`Servidor-front a la escucha del puerto ${PORT} `);
});
