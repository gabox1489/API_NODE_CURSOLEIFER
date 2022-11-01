const bcrypts = require("bcryptjs");


/**
 * Contraseña sin encriptar por ejemplo : hola 01
 * @param {*} passwordPlain
 */
const encrypt = async(passwordPlain) => { //FUNCION PARA ENCRYPTAR LA CONTRASEÑA
    const hash = await bcrypts.hash(passwordPlain, 10)
    return hash
};

/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */

const compare = async(passwordPlain, hashPassword) => { //FUNCION PARA COMPARAR UNA CONTRASEÑA CON LA VERSION ENCRIPTADA DEL USUARIO
    return await bcrypts.compare(passwordPlain, hashPassword)
};




module.exports = { encrypt, compare };