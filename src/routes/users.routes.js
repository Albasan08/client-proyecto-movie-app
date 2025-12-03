//Importaciones de 3ros
const express = require("express");
const router = express.Router();

//importaciones locales
const {favoritosUser}=require('../controllers/users.controllers')

// mostrar formulario
router.get('/',favoritosUser)


//exporta el objeto
module.exports=router