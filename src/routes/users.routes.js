//Importaciones de 3ros
const express = require("express");
const router = express.Router();

//importaciones locales
const {
    viewLogin,
    loginUser,
    viewRegister,
    registerUser,
    favoritosUser,
} = require("../controllers/users.controllers");

// mostrar formulario
router.get("/", viewLogin);
router.post("/login", loginUser);
router.get("/signup", viewRegister);
router.post("/signup", registerUser);
router.get("/movies", favoritosUser);

//exporta el objeto
module.exports = router;
