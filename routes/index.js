const express = require('express');
const fs = require('fs');
const router = express.Router(); //NATIVO DE EXPRESS PARA CONTROLAR LAS RUTAS

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}


fs.readdirSync(PATH_ROUTES).filter((file) => { //LEER EL DIRECTORIO DE MANERA ASINCRONA, DEVUELVE LOS ARCHIVOS DE LAS RUTAS QUE SE UTILIZAN
    const name = removeExtension(file)
    if (name !== 'index') {
        router.use(`/${name}`, require(`./${file}`))
    }

})




module.exports = router