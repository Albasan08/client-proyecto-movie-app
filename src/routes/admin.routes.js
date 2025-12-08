//Importaciones de 3ros
const express = require("express");
const router = express.Router();

//para el control de imagenes subidas
const multer = require("multer");

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



const { protegerVista } = require("../helper/protegerVista");


// Mostrar formulario para crear pelicula
router.get("/createmovie", protegerVista("admin"), crearPeliculaForm);

// Crear pelicula desde formulario
router.post(
    "/createmovie",
    protegerVista("admin"),
    upload.single("url_imagen"),
    crearPelicula
);

// Mostrar datos pelicula en formulario
router.get(
    "/editmovie/:id",
    protegerVista("admin"),
    editarPeliculaForm,
    upload.single("url_imagen")
);

// Actualizar datos pelicula desde formulario
router.post(
    "/editmovie/:id",
    protegerVista("admin"),
    upload.single("url_imagen"),
    editarPelicula
);

// Elimiar
router.post("/removemovie/:id", protegerVista("admin"), eliminarPelicula);

//exporta el objeto
module.exports = router;
