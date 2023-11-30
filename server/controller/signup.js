const { check, validationResult } = require("express-validator");
const { peopleModel } = require("../models/people");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { sendMail } = require("../util/email/sendEmail");
const jwt = require('jsonwebtoken');

const signUpChecker = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Enter at least 3 character name"),
  check("email")
    .isEmail()
    .withMessage("Enter a valid Email Address")
    .custom(async (value) => {
      const user = await peopleModel.find({ email: value });
      if (user?.length > 0) {
        throw new Error("User already exists");
      }
      return true;
    }),
  check("password")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Enter a password with 8 letter long with 1 number, 1 lowercase, 1 uppercase, 1 symbol"
    ),
];

const signUpValidation = (req, res, next) => {
  try {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length > 0) {
      res.status(400).json(mappedErrors);
    }else{
        next();
    }
  } catch (error) {
    console.log(error);
    next(createError(500, error?.message));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newPass = await bcrypt.hash(password, 10);
    const hash = crypto.createHash('sha256', email).digest('hex') + Date.now().toString();
    const result = await sendMail('Videology Verification Code', `Here is your Verification Code: ${hash}\n\n--Videology Team`, email);
    const token = await jwt.sign({
        name: name,
        email: email,
    }, process.env.salt, {
        expiresIn: 86400,
    })
    const newUser = new peopleModel({
        name,
        email,
        password: newPass,
        verified: false,
        code: hash,
    });
    await newUser.save();
    res.status(201).json({
        token: token,
        name,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, error?.message));
  }
};

module.exports = {
    signUpChecker,
    signUpValidation,
    createUser,
}
