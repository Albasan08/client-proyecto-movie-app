//Importaciones de 3ros
const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })

//importaciones locales
const {crearPelicula, crearPeliculaForm}=require('../controllers/admin.controllers')

// mostrar formulario
router.get('/createmovie',crearPeliculaForm)

//llamada al controlador del back para insertar lo que se ha recibido por formulario
router.post('/movies/createmovie',upload.single('url_imagen'),crearPelicula)


//exporta el objeto
module.exports=router