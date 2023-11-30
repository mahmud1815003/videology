const express = require("express");
const userRouter = express.Router();
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userEmailVerificaion, userEmailVerificaionResult, verifiyUser } = require("../controller/user");
const { addFriend } = require("../controller/addFriend");
const { getFriends, getSingle } = require("../controller/getFriends");

userRouter.use(async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decoded = await jwt.verify(authorization, process.env.salt);
    if (decoded) {
      res.locals.user = {
        email: decoded.email,
      };
      console.log(decoded.email);
      next();
    } else {
        res.status(401).json({
            msg: 'Unauthorized',
        });
    }
    // const decoded = await jwt.verify()
  } catch (error) {
    console.log(error);
    next(createError(401, "Unauthorized"));
  }
});

userRouter.post('/emailVerification', userEmailVerificaion, userEmailVerificaionResult, verifiyUser);
userRouter.post('/addFriend', addFriend);
userRouter.get('/allFriends', getFriends);
userRouter.post('/single', getSingle);

module.exports = {
  userRouter,
};
