const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const Document = require("../models/Document");
const Audit = require("../models/Audit");
const { v4: uuidv4 } = require("uuid");
const path = require("path");


router.post("/upload",authMiddleware,upload.single("pdf"),async(req,res)=>{
  console.log("REQ.FILE =", req.file);

const fs = require("fs");

if (req.file) {
    console.log("FILE EXISTS:", fs.existsSync(req.file.path));
}
    if(!req.file){
      return res.status(400).json({
        success:false,
        message:"No file received"
      });
    }
    const document = await Document.create({
        title: req.file.originalname,
        fileName: req.file.filename,
        filePath: `uploads/${req.file.filename}`,
        owner: req.user.id
    });
    await Audit.create({ 
      userId: req.user.id,
      documentId: document._id,
      action: "Uploaded Document"
    });
    res.json({
        success:true,
        document
    });

});

router.get("/my-documents",authMiddleware,async(req,res)=>{
    const documents = await Document.find({
        owner:req.user.id
    });
    res.json({
        success:true,
        documents
    });
    }
);

router.get("/:id", authMiddleware, async(req,res)=>{
    const document = await Document.findById(
        req.params.id
    );
    res.json({
        success:true,
        document
    });
});

router.get("/download/:id",authMiddleware,async(req,res)=>{       
    const document = await Document.findById(req.params.id);
    res.download(
        document.signedPdf
    );
});

router.post("/share/:id",authMiddleware,async(req,res)=>{
  const document = await Document.findById(
    req.params.id
  );
  const token = uuidv4();
  document.shareToken = token;
  if (document.status !== "Signed") {
    return res.status(400).json({
        success: false,
        message: "Document must be signed before sharing."
    });
}
  await document.save();
  res.json({
    success:true,
    link:
      `http://localhost:5173/shared-sign/${token}`
  });

});

router.get("/shared/:token", async (req, res) => {
    const document = await Document.findOne({
        shareToken: req.params.token
    });

    if (!document) {
        return res.status(404).json({
            success: false,
            message: "Document not found"
        });
    }

    res.json({
        success: true,
        document: {
            title: document.title,
            filePath: document.signedPdf || document.filePath,
            status: document.status
        }
    });
});
router.delete("/delete/:id",authMiddleware,async (req, res) => {
   try {
      await Audit.create({
        userId:req.user.id,
        documentId:req.params.id,
        action:"Deleted Document"
      });
      
      await Document.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message: "Document Deleted"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }
);

module.exports = router;