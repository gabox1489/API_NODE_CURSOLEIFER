const express = require('express');
const { loginCtrl, registerCtrl } = require("../controllers/auth");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");

/**
 * Crear un registro
 */

//CREAREMOS UNA RUTA CON EL REGISTER
router.post("/register", validatorRegister, registerCtrl);

//CREAREMOS UN RUTA CON EL LOGIN
router.post("/login", validatorLogin, loginCtrl);



module.exports = router;