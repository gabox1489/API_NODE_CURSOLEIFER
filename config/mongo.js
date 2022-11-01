const mongoose = require('mongoose')

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        if (!err) {
            console.log('Cargando ruta storage.........');
            console.log('Cargando ruta tracks......');
            console.log('*****CONEXION EXITOSA*******');
        } else {
            console.log('ERROR DE CONEXION');
        }
    });
}

module.exports = dbConnect