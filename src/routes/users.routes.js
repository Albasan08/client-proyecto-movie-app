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
    viewDashboard,
} = require("../controllers/users.controllers");
const {
    evitarLoginSiAutenticado,
} = require("../helper/evitarLoginSiAutenticado");

const { protegerVista } = require("../helper/protegerVista");

// mostrar formulario
router.get("/", evitarLoginSiAutenticado, viewLogin);
router.post("/login", loginUser);
router.get("/signup", evitarLoginSiAutenticado, viewRegister);
router.post("/signup", registerUser);
router.get("/dashboard", protegerVista("user"), viewDashboard);
router.get("/movies", protegerVista("user"), favoritosUser);

//exporta el objeto
module.exports = router;
