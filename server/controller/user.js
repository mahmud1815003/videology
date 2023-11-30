const createHttpError = require("http-errors");
const { peopleModel } = require("../models/people");
const { check, validationResult } = require("express-validator");

const userEmailVerificaion = [
  check("code").custom(async (value) => {
    const user = await peopleModel.find({ code: value });
    if (user?.length > 0) {
      return true;
    }
    throw new Error("Invalid Verification Code");
  }),
];

const userEmailVerificaionResult = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const mappedErros = errors.mapped();
    if (Object.keys(mappedErros)?.length > 0) {
      res.status(400).json(mappedErros);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

const verifiyUser = async (req, res, next) => {
  try {
    const user = await peopleModel.find({
      email: res.locals.user.email,
      code: req.body.code,
    });
    if (user?.length > 0) {
      const updated = await peopleModel.findOneAndUpdate(
        { email: res.locals.user.email, code: req.body.code },
        {
          code: "",
          verified: true,
        },
        { new: true }
      );
      res.status(200).json({
        name: updated.name,
        token: req.headers.authorization,
        verified: true,
      });
    } else {
      res.status(400).json({
        code: "Invalid Code",
      });
    }
  } catch (error) {
    console.log(error);
    next(400, error.message);
  }
};

module.exports = {
  userEmailVerificaion,
  userEmailVerificaionResult,
  verifiyUser,
};
