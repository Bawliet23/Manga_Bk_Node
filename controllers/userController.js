const User = require('../models/user')
const Role = require('../models/role')
const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.signup = (req,res)=>{
    const user = new User({
        username:req.body.username,
        password:Bcrypt.hashSync(req.body.password)
    })
    user.save().then(result => {

        if (req.body.role) {
            Role.find(
              {
                name: { $in: req.body.role }
              },
              (err, role) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
      
                user.role = role.map(r => r._id);
                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  } console.log(user)
                  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_CODE, {
                    expiresIn: 86400 
                  });
                  res.status(200).send({
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    accessToken: token
                  });
                });
              }
            );
          }else {
            Role.findOne({ name: "user" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
      
              user.role = role._id;
              user.save(err => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_CODE, {
                    expiresIn: 86400 
                  });
                  res.status(200).send({
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    accessToken: token
                  });
              });
            });
          }


        
    // }).catch(error=>res.json({sucess:false,error}))
})}


exports.signin = (req, res) => {
    User.findOne({
      username: req.body.username
    })
      .populate("role", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = Bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_CODE, {
          expiresIn: 86400 
        });
  
      
        res.status(200).send({
          id: user._id,
          username: user.username,
          role: user.role,
          accessToken: token
        });
      });
  };