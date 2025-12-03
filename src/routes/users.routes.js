//Importaciones de 3ros
const express = require("express");
const router = express.Router();

//importaciones locales
const {dashboardUser}=require('../controllers/users.controllers')

// mostrar formulario
router.get('/dashboard',dashboardUser)


//exporta el objeto
module.exports=router