'use strict';

const AWS = require('aws-sdk');
const query = require('../queries');
const { v4 : uuid } = require('uuid');
const _ = require('lodash');
const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18', region: 'us-east-1'});

const createUser = async (req, res) => {
    const username = req.body.username || null;
    const emp_no = req.body.emp_no || null;
    let response = {};
    const params = {
        UserPoolId: 'us-east-1_EJZvOmHNo', /* required */
        Username: username, /* required */
        DesiredDeliveryMediums: [
          'EMAIL',
        ],
        ForceAliasCreation: false,
        MessageAction: 'SUPPRESS',
        TemporaryPassword: 'TempP@55word', // 'Te5tPa%%1'
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
      const data = await cognito.adminCreateUser(params).promise();
      console.log(data);
      const res = await query.user.createUser(emp_no, username);
      console.log(res);
    }
    catch (err) {
      console.log(err);
    }

//     if (empNo) {
//         try {
//             let salaries = await query.employees.getAllSalaries(empNo);
//             salaries = salaries.map(salary => salary.dataValues);
//             response.body = {
//                 salaries
//             }
//         }
//         catch (err) {
//         };
//     }
//     else {
//         response.body = { 'message': 'empId is null' };
//     }
//     res.json(response.body);
   };

module.exports = createUser;