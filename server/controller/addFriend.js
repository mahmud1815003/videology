const createHttpError = require("http-errors");
const { peopleModel } = require("../models/people");
const { check, validationResult } = require("express-validator");
const { friendModel } = require("../models/friend");

const addFriend = async (req, res, next) => {
  try {
    const sender = res.locals.user.email;
    if (res.locals.user.email == req.body.email) {
      res.status(400).json({
        email: {
          msg: "You can not add you as your Friend",
        },
      });
    } else {
      const { email } = req.body;
      const user = await peopleModel.find({ email: req.body.email });
      if (user.length > 0) {
        const isFriend = await friendModel.find({
          $or: [
            { friend1: sender, friend2: email },
            { friend1: email, friend2: sender },
          ],
        });
        if (isFriend.length > 0) {
            res.status(400).json({
                email: {
                    msg: 'Already Friend',
                }
            })
        } else {
          const newFriend = new friendModel({
            friend1: email,
            friend2: res.locals.user.email,
          });
          await newFriend.save();
          res.status(201).json({
            msg: "New Friends Added",
          });
        }
      } else {
        res.status(400).json({
          email: {
            msg: "No User Found",
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(400, error.message);
  }
};

module.exports = {
  addFriend,
};
