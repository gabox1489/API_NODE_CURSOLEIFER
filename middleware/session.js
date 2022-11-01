const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async(req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401); //COMPARAMOS EN CASO QUE NO EXISTA EL TOKEN EN EL REQ
            return
        }

        const token = req.headers.authorization.split(' ').pop(); //CAPTAMOS EL TOKEN Y LO DIVIDIMOS OBTENIENDO ULTIMO ELEMENTO
        const dataToken = await verifyToken(token); //Obtenemos el payload

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }


        const user = await usersModel.findOne(query); //CHEQUEO QUIEN ES EL USUARIO QUE ESTA HACIENDO LA PETICION
        req.user = user
        next()
    } catch (e) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
};

module.exports = authMiddleware, getProperties;