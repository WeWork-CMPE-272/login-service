'use strict';

const AWS = require('aws-sdk');
const query = require('../queries');
const { v4: uuid } = require('uuid');
const _ = require('lodash');
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: 'us-east-1' });

const createUser = async (req, res) => {
  const username = req.body.username || null;
  const emp_no = req.body.empNo || null;
  let response = {};
  console.log(username);
  console.log(emp_no);
  const params = {
    UserPoolId: 'us-east-1_EJZvOmHNo', /* required */
    Username: username, /* required */
    DesiredDeliveryMediums: [
      'EMAIL',
    ],
    ForceAliasCreation: false,
    MessageAction: 'SUPPRESS',
    TemporaryPassword: 'TempP@55word', // 'Te5tPa%%!'
    UserAttributes: [
      {
        Name: 'name', /* required */
        Value: req.body.name,
      },
      {
        Name: 'email',
        Value: `${uuid()}@gmail.com`,
      },
      {
        Name: 'email_verified',
        Value: "true",
      }
      /* more items */
    ],
  }

  try {
    cognito.adminCreateUser(params, async function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        res.json({ 'message': 'Error creating user' });
      }
      else {
        console.log('Looking for user');
        const user = await query.user.createUser(emp_no, username);
        res.json({ 'body' : {...data, ...user.dataValues }})
      }             // successful response
    });
  }
  catch (err) {
    res.json({ 'message': 'Error creating user' });
  }

};

module.exports = createUser;