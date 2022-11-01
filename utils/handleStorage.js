const multer = require('multer');
//APLICAMOS LA CONFIGURACION DE MULTER, POR LO MENOS NECESITA ESTOS DOS ARCHIVOS
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },
    filename: function(req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`; //funcion para asignar nombre al archivo
        cb(null, filename) //funcion callback
    },
});

//CREAMOS UN MIDDLEWARE ENTRE LA RUTA Y EL CONTROLADOR PARA UTILIZAR EL STORAGE
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;