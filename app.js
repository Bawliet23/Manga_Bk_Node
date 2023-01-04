const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const mangaRouter = require('./routes/mangaRoutes')
const chapterRouters = require('./routes/chapterRouters')
const userRouters = require('./routes/userRouters')
const app = express()
const Role = require('./models/role')
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'})



const port = process.env.PORT;
const dbUri = 'mongodb+srv://user:1234@manga.9msevea.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUri)


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/manga",mangaRouter);

app.use("/chapter",chapterRouters);
app.use("/user",userRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  




function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }