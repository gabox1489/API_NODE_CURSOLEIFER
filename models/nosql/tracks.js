const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const tracksScheme = new mongoose.Schema({
    name: {
        type: String,
    },
    album: {
        type: String,
    },
    cover: {
        type: String,
        validate: {
            validator: (req) => {
                return true;
            },
            message: "ERROR_URL",
        },
    },
    artist: {
        name: {
            type: String,
        },
        nickname: {
            type: String,
        },
        nationality: {
            type: String,
        },
    },
    duration: {
        start: {
            type: Number,
        },
        end: {
            type: Number,
        },
    },
    mediaId: {
        type: mongoose.Types.ObjectId,
    },
}, {
    versionKey: false,
    timestamps: true,
});

/**
 * Implementar metodo propio con relacion a storage
 */

tracksScheme.statics.findAllData = function() {
    const joinData = this.aggregate([
        //TODO Tracks
        {
            $lookup: {
                from: "storage", //TODO Tracks --> storage
                localField: "mediaId", //TODO Tracks.mediaId
                foreignField: "_id", //TODO Straoges._id
                as: "audio", //TODO Alias!
            },
        },

    ]);
    return joinData;
};


tracksScheme.statics.findOneData = function(id) {
    const joinData = this.aggregate([
        //TODO Tracks
        {
            $lookup: {
                from: "storage", //TODO Tracks --> storage
                localField: "mediaId", //TODO Tracks.mediaId
                foreignField: "_id", //TODO Straoges._id
                as: "audio", //TODO Alias!
            },
        },

        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        }

    ]);
    return joinData;
};


tracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", tracksScheme);