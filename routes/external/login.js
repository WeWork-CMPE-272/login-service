'use strict';

const express = require('express');

const createUser = require('../../middleware/create-user');
//const getUser = require('../../middleware/get-user');

const login = express.Router();

login.post('/createUser', createUser);

//login.get('/user/:username', getUser);

module.exports = login;