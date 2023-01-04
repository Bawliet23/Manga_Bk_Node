const jwt = require("jsonwebtoken");
const User = require('../models/user')
const Role = require('../models/role')




verifyToken = (req, res, next) => {
    console.log("hiiiiiiiiiiiiiiiiiiiii")
    console.log(req.headers)
    let token = req.headers["authorization"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
     token = token.replace('Bearer ','')
    jwt.verify(token, process.env.JWT_SECRET_CODE, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };



  isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.findById(user.role).exec((err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log(role.name+ "  hejeehehehehehheh")

          if (role.name === "admin") {
            next();
            return;
          
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      })
        
      
  })
  };
  const authJwt = {
    verifyToken,
    isAdmin
  };
  module.exports = authJwt;