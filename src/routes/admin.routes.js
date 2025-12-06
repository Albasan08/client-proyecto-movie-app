//Importaciones de 3ros
const express = require("express");
const router = express.Router();

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

//importaciones locales
const {
    crearPelicula,
    crearPeliculaForm,
    editarPelicula,
    editarPeliculaForm
} = require("../controllers/admin.controllers");

// mostrar formulario
router.get("/createmovie", crearPeliculaForm);

//llamada al controlador del back para insertar lo que se ha recibido por formulario
router.post("/createmovie", upload.single("url_imagen"), crearPelicula);

// Mostrar formulario
router.get("/editmovie/:id", /* upload.single("url_imagen") ,editarPelicula*/ editarPeliculaForm);

// Guardar cambios
router.put("/editmovie/:id", upload.single('url_imagen'), editarPelicula);

//exporta el objeto
module.exports = router;
