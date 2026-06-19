const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Document"
    },

    action:{
        type:String,
        required:true
    },

    timestamp:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model(
    "Audit",
    auditSchema
);