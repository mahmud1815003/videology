const express = require('express');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { signUpChecker, signUpValidation, createUser } = require('../controller/signup');
const { checkLogin, loginValidation, loginTokens, verify } = require('../controller/login');
const authRouter = express.Router();


authRouter.post('/login', checkLogin, loginValidation, loginTokens);
authRouter.post('/signup', signUpChecker, signUpValidation, createUser);
authRouter.post('/verify', verify);

module.exports = {
    authRouter,
}