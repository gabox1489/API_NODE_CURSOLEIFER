const fs = require("fs");
const { storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async(req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_LIST_ITEMS");
    }
};

/**Obtener un detalle de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getDetailsItems = async(req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_DETAILS_ITEMS");
    }
};


/**Insertar un elemento en la lista en la base de datos
 * @param {*} req
 * @param {*} res
 */
const createItems = async(req, res) => {

    try {
        const { file } = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }


};


/**Borrar lista en la base de datos
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async(req, res) => {

    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({ _id: id })
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}` //Donde se encuentra el archivo, ejm: disco c, etc

        //fs.unlinkSync(filePath); //que elimine lo que esta en ese registro
        const data = {
            filePath,
            deleted: 1
        }


        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};






module.exports = { getItems, getDetailsItems, createItems, deleteItems };