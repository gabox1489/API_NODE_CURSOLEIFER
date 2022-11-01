const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties()

//AHORA GENERAMOS EL WEBTOKEN

//Metodo para firmar el token :
const tokenSign = async(user) => { //pasamos el objeto del usuario
    const sign = jwt.sign({
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role,
        },
        JWT_SECRET, {
            expiresIn: "24h",
        }
    );
    return sign
};

//Funcion para verificar que el token haya sido firmado de manera incorrecta
const verifyToken = async(tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }
};

module.exports = { tokenSign, verifyToken }