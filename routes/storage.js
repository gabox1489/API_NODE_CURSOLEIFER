const express = require('express');
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItems } = require('../validators/storage')
const { getItems, getDetailsItems, createItems, updateItems, deleteItems } = require('../controllers/storage');





router.get("/", getItems); //ruta de listar items
router.get("/:id", validatorGetItems, getDetailsItems); //obtener detalles de un item en especifico
router.post("/", uploadMiddleware.single("myfile"), createItems); //PARA EL ENVIO DE ARCHIVOS SE UTILIZA EL METODO POST
router.delete("/:id", validatorGetItems, deleteItems); //borrar un registro


module.exports = router;