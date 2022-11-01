const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

//DECLARAMOS NUESTRO ESQUEMA
const storageSchemme = new mongoose.Schema({
    url: {
        type: String
    },

    filename: {
        type: String
    },

}, {
    timestamps: true, //TODO createat, updateat
    versionKey: false,
});
storageSchemme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storage", storageSchemme)