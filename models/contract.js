const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    influencer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    agency: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Contract", schema);
