const express = require("express");
const router = express.Router();

const Document = require("../models/Document");
const authMiddleware =
require("../middleware/authMiddleware");

router.get(
    "/stats",
    authMiddleware,
    async(req,res)=>{

        const documents =
        await Document.find({
            owner:req.user.id
        });

        const totalDocuments =
        documents.length;

        const signedDocuments =
        documents.filter(
            doc=>doc.status==="Signed"
        ).length;

        const pendingDocuments =
        documents.filter(
            doc=>doc.status==="Pending"
        ).length;

        res.json({
            totalDocuments,
            signedDocuments,
            pendingDocuments
        });
    }
);

module.exports = router;