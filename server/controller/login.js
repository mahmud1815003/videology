const { check, validationResult } = require("express-validator");
const { peopleModel } = require("../models/people");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkLogin = [
  check("email")
    .isEmail()
    .withMessage("Enter a Valid Email Address")
    .custom(async (value) => {
      const user = await peopleModel.find({ email: value });
      if (user.length == 0) {
        throw new Error("No User Found");
      }
      return true;
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Enter a password with minimum 8 letters"),
];

const loginValidation = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length > 0) {
    res.status(400).json(mappedErrors);
  } else {
    next();
  }
};

const loginTokens = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await peopleModel.find({ email: email });
    const ok = await bcrypt.compare(password, user[0].password);
    if (ok) {
      const token = await jwt.sign(
        {
          email: email,
        },
        process.env.salt,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        name: user[0].name,
        token: token,
        verified: user[0].verified,
      });
    } else {
      res.status(400).json({
        password: {
          msg: "Password did not match",
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(createError(400, error.message));
  }
};

const verify = async (req,res,next) => {
  try{
    const decoded = await jwt.verify(req.body.token,process.env.salt);
    if(decoded){
      const user = await peopleModel.findOne({email:  decoded.email});
      res.status(200).json({
        name: user.name,
        token: req.body.token,
        verified: user.verified,
      })
    }else{
      res.status(401).json({
        msg: 'Broken Token',
      })
    }
  }catch(error){
     console.log(error);
     next(createError(401, error?.message));
  }
}

const socketVerfiy = async (socket, next) => {
    try{
      const decoded = await jwt.verify(socket?.handshake?.auth?.token, process.env.salt);
      if(decoded){
        next();
      }else{
        next(createError(401, 'Unauthrized'));
      }
    }catch(error){
      console.log(error);
      next(createError(401, 'Unauthrized'));
    }
}


module.exports = {
  checkLogin,
  loginValidation,
  loginTokens,
  verify,
  socketVerfiy,
};
