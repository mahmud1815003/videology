const createHttpError = require("http-errors");
const { friendModel } = require("../models/friend");
const { peopleModel } = require("../models/people");

const getFriends = async (req,res,next) => {
    try{
        const friends = await friendModel.find({$or:[{friend1: res.locals.user.email}, {friend2: res.locals.user.email}]})
        console.log(friends);
        res.status(200).json({
            friends,
            email: res.locals.user.email,
        });
    }catch(error){
        console.log(error);
        next(400, error.message);
    }
}

const getSingle = async (req,res,next) => {
    try{
        const {email} = req.body;
        console.log(email);
        const user = await peopleModel.find({email: email});
        console.log(req.body);
        res.status(200).json({
            name: user[0].name,
            email: user[0].email,
        })
    }catch(error){
        console.log(error);
        next(400, createHttpError(error.message));
    }
}

module.exports = {
    getSingle,
    getFriends
}