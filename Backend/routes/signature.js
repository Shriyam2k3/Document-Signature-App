const express = require("express");
const upload = require("../middleware/signatureUpload");
const router = express.Router();
const Signature = require("../models/Signature");
const authMiddleware = require("../middleware/authMiddleware");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const Document = require("../models/Document");
const Audit = require("../models/Audit");

router.post( "/upload",authMiddleware,upload.single("signature"),async(req,res)=>{
    const signature = await Signature.create({
        documentId:req.body.documentId,
        signerId:req.user.id,
        signatureImage:req.file.path
    });
    res.json({
        success:true,
        signature
    });
});
router.post("/apply", authMiddleware, async(req,res)=>{
    console.log(req.body);
    const document = await Document.findById(
        req.body.documentId
    );
    console.log("Document from DB:", document);
    const signature = await Signature.findOne({
        signerId:req.user.id
    });
    if(!signature){
    return res.status(404).json({
        success:false,
        message:"No signature uploaded"
    });
    }
console.log(document.filePath);
console.log(signature.signatureImage);

// Handle PDF path
let pdfPath = document.filePath;

if (!path.isAbsolute(pdfPath)) {
    pdfPath = path.join(__dirname, "..", pdfPath);
}
// Handle Signature path
let signaturePath = signature.signatureImage;

if (!path.isAbsolute(signaturePath)) {
    signaturePath = path.join(__dirname, "..", signaturePath);
}

console.log("PDF Path:", pdfPath);
console.log("PDF Exists:", fs.existsSync(pdfPath));

console.log("Signature Path:", signaturePath);
console.log("Signature Exists:", fs.existsSync(signaturePath));

const pdfBytes = fs.readFileSync(pdfPath);
const signatureBytes = fs.readFileSync(signaturePath);
    const pdfDoc = await PDFDocument.load(
        pdfBytes
    );
    const image = await pdfDoc.embedJpg(
        signatureBytes
    );
    const page = pdfDoc.getPages()[0];
    page.drawImage(image,{
        x: 50,
        y: 50,
        width: 150,
        height: 80
    });
    const pdfBytesSigned = await pdfDoc.save();
    console.log("PDF Saved");
    const signedFileName = `signed-${Date.now()}.pdf`;

const outputPath = path.join(
    __dirname,
    "..",
    "uploads",
    "signed",
    signedFileName
);

fs.writeFileSync(outputPath, pdfBytesSigned);

document.signedPdf = `uploads/signed/${signedFileName}`;
    document.status = "Signed";
    await document.save();
    res.json({
        success:true,
        signedPdf:document.signedPdf
    });
});
router.get("/history",authMiddleware,async (req, res) => {
    try {
        const history = await Signature.find({
            signerId: req.user.id
        });
        res.json({
            success: true,
            history
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;