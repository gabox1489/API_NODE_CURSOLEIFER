const express = require('express');
const { validatorCreateItems, validatorGetItems } = require("../validators/tracks");
const { getItems, getDetailsItems, createItems, updateItems, deleteItems } = require('../controllers/tracks');
const authMiddleware = require("../middleware/session");
const customHeader = require("../middleware/customHeader");
const checkRol = require('../middleware/role');
const router = express.Router(); //NATIVO DE EXPRESS PARA CONTROLAR LAS RUTAS


router.get("/", authMiddleware, getItems); //ruta de listar items

router.get("/:id", authMiddleware, validatorGetItems, getDetailsItems); //obtener detalles de un item en especifico

router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItems, createItems); // ruta de crear items

router.put("/:id", authMiddleware, validatorCreateItems, validatorGetItems, updateItems); // ruta para actualizar un item

router.delete("/:id", authMiddleware, validatorGetItems, deleteItems); //borrar un registro


module.exports = router