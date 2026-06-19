const mongoose = require("mongoose");
const signatureSchema = new mongoose.Schema({
    documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Document",
    },
    signerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    signatureImage:{
        type:String,
        required:true
    },
    signedAt: {
        type: Date,
        default: Date.now
    }

},{
    timestamps:true
});

const Signature = mongoose.model(
    "Signature",
    signatureSchema
);
module.exports = Signature;