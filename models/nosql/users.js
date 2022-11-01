const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

//DECLARAMOS NUESTRO ESQUEMA
const userSchemme = new mongoose.Schema({
    name: {
        type: String
    },

    age: {
        type: Number
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        select: false
    },

    role: {
        type: ["user", "admin"],
        default: "user"
    },
}, {
    timestamps: true, //TODO createat, updateat
    versionKey: false,
});
userSchemme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", userSchemme)