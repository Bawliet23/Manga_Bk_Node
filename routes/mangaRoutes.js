const express = require("express")
const router = express.Router()
const {mangaById , getAll , addManga,deleteManga,updateManga,search} = require('../controllers/mangaController')
const multer  = require('multer')
const path= require('path')
const authJwt  = require("../middlewares/authJwt");




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/manga')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +Date.now() + path.extname(file.originalname))
    }
  })
const upload = multer({storage : storage})

//add search

router.get("/",[authJwt.verifyToken],getAll)
router.get("/:id",[authJwt.verifyToken],mangaById)
router.get("/search/:name",[authJwt.verifyToken],search)
router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin],deleteManga)
router.put("/:id",[authJwt.verifyToken,authJwt.isAdmin],updateManga)
router.post("/",[authJwt.verifyToken,authJwt.isAdmin,upload.single('cover')],addManga)
module.exports = router