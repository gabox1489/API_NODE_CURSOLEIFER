const { matchedData } = require("express-validator");
const { tracksModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async(req, res) => {
    try {
        const user = req.user;
        const data = await tracksModel.findAllData({});
        res.send({ data, user })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**Obtener un detalle de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getDetailsItems = async(req, res) => {
    try {
        req = matchedData(req);
        const { id } = req; //pido el id desde el request 
        const data = await tracksModel.findOneData(id);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};


/**Insertar un elemento en la lista en la base de datos
 * @param {*} req
 * @param {*} res
 */
const createItems = async(req, res) => {

    try {

        const body = matchedData(req) //sirve para limpiar el body cuando manden datos equivocados
        const data = await tracksModel.create(body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};

/**Actualizar lista en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateItems = async(req, res) => {
    try {


        const { id, ...body } = matchedData(req);
        const data = await tracksModel.findByIdAndUpdate(
            id, body
        );
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEMS");
    }
};

/**Borrar lista en la base de datos
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async(req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.delete({ _id: id });
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};





module.exports = { getItems, getDetailsItems, createItems, updateItems, deleteItems };