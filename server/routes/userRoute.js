const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

/** Resgister all routes here realted to user */
Router.post('/registration',userController.register);
Router.post('/login',userController.login);

module.exports = Router;