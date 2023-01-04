const Chapter = require('../models/chapter')
const express = require("express")
const router = express.Router()
const multer  = require('multer')
const path = require('path')
const { chapterById , deleteChapter , updateChapter , addChapter} = require('../controllers/chapterController')
const authJwt  = require("../middlewares/authJwt");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/chapters')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +Date.now() + path.extname(file.originalname))
    }
  })
const upload = multer({storage : storage})
 

router.get("/:id",[authJwt.verifyToken],chapterById)
router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin,],deleteChapter)
// router.route("/:id").put(updateChapter)
router.post("/",[authJwt.verifyToken,authJwt.isAdmin, upload.array('images')],addChapter)

module.exports = router
