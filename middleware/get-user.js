'use strict';

const query = require('../queries');
const _ = require('lodash');

const getUser = async (req, res) => {
  const username = req.params.username || null;
  const response = {};
  if (username) {
    console.log(`Getting user for username ${username}`);
    const user = await query.user.getUser(username);
    const employee = await query.employees.findByEmpNo(user.empNo);
    response.body = {
      ...user.dataValues,
      ...employee.dataValues,
    }

  }
  else {
    response.body = {
      message: 'username is not provided',
    }
  }
  console.log(`Sending response ${response.body}`);
  res.json(response.body);
};

module.exports = getUser;