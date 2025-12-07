//Importaciones de 3ros
const express = require("express");
const router = express.Router();

//para el control de imagenes subidas
const multer = require('multer');

//definicion de almacenamiento en memoria
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
router.get("/editmovie/:id",editarPeliculaForm,upload.single("url_imagen"));

// Guardar cambios
router.post("/editmovie/:id", upload.single('url_imagen'), editarPelicula);

//exporta el objeto
module.exports = router;
