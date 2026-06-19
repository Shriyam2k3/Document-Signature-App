const express = require("express");
const router = express.Router();

const Audit = require("../models/Audit");
const authMiddleware =
require("../middleware/authMiddleware");

router.get(
    "/history",
    authMiddleware,
    async(req,res)=>{

        const audits =
        await Audit.find({
            userId:req.user.id
        })
        .sort({timestamp:-1});

        res.json({
            success:true,
            audits
        });
    }
);

module.exports = router;