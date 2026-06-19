const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    fileName:{
        type:String,
        required:true,
    },
    filePath:{
        type:String,
        required:true,
    },
    signedPdf:{
        type:String,
        default:null
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status: {
        type: String,
        default: "Pending"
    },
    shareToken:{
        type:String
    }
},{
    timestamps:true
});

const Document = mongoose.model(
    "Document",
    documentSchema
);

module.exports = Document;