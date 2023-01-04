const Chapter = require('../models/chapter')
const Manga = require('../models/manga')

exports.chapterById = (req , res )=>{
    const id = req.params.id
    Chapter.findById(id).then(result => {
        res.json(result)
    }).catch(err => console.log(err))
    }

    exports.addChapter = (req , res)=>{
        let m = JSON.parse(req.body.chapter);
        m.images = req.files.map(file => file.filename)
        console.log(m)

         const chapters = new Chapter({
            name:m.name,
            number:m.number,
            images:m.images,
            manga:m.manga,
           
         })
        chapters.save().then(result=>{
            Manga.findById(m.manga).then(manga=>
                {
                    manga.chapters.push(result._id)
                    manga.save()
                }

            )
            res.json(result)})
        
    }
    exports.deleteChapter = (req , res)=>{
        Chapter.findByIdAndRemove(req.params.id).then(result=>res.json("deleted succesfully")).catch(console.log("erreur"))
           // res.json(req.file)
       }