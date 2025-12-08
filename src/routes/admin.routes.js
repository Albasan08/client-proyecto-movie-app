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
    editarPeliculaForm,
    eliminarPelicula,
    favoritosAdmin
} = require("../controllers/admin.controllers");


router.get("/", favoritosAdmin);

// Mostrar formulario para crear pelicula
router.get("/createmovie", crearPeliculaForm);

// Crear pelicula desde formulario
router.post("/createmovie", upload.single("url_imagen"), crearPelicula);

// Mostrar datos pelicula en formulario
router.get("/editmovie/:id",editarPeliculaForm,upload.single("url_imagen"));

// Actualizar datos pelicula desde formulario
router.post("/editmovie/:id", upload.single('url_imagen'), editarPelicula);

// Elimiar 
router.post("/removemovie/:id", eliminarPelicula);



//exporta el objeto
module.exports = router;
