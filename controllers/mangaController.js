
const Manga = require('../models/manga')


exports.mangaById = (req , res )=>{
const id = req.params.id
Manga.findById(id).populate('chapters').then(result => {
    res.json(result)
}).catch(err => console.log(err))
}
exports.getAll = (req , res )=>{
    Manga.find().then(result => {
        res.json(result)
    })
   
}

exports.search = (req , res )=>{
    const name = req.params.name
    Manga.find({title:{$regex: `${name}`,$options: 'i' }}).populate('chapters').then(result => {
        res.json(result)
    }).catch(err => console.log(err))
    }
    exports.getAll = (req , res )=>{
        Manga.find().then(result => {
            res.json(result)
        })
       
    }
exports.addManga = (req , res)=>{
    let m = JSON.parse(req.body.manga);
    m.cover = req.file.filename
    console.log(m)
     const manga = new Manga({
        title:m.title,
        description:m.description,
        cover:m.cover,
        auteur:m.auteur,
        rating:m.rating,
        numberOfChapters:m.numberOfChapters

     })
    manga.save().then(result=>res.json(result))
    // res.json(req.file)
}
exports.updateManga = (req , res)=>{
    let m = JSON.parse(req.body.manga);
     const manga = new Manga({
        title:m.title,
        description:m.description,
        cover:m.cover,
        auteur:m.auteur,
        rating:m.rating,
        numberOfChapters:m.numberOfChapters

     })
    manga.save().then(result=>res.json(result))
    // res.json(req.file)
}
exports.deleteManga = (req , res)=>{
 Manga.findByIdAndRemove(req.params.id).then(result=>res.json("deleted succesfully")).catch(console.log("erreur"))
    // res.json(req.file)
}