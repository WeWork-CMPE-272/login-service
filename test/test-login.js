const nock = require('nock');
const assert = require('clutch-assert');

const createUser = require('./../middleware/create-user');
const getUser = require('./../middleware/get-user');

const { v4: uuid } = require('uuid');

describe('Testing login', () => {
    var user_name = uuid()
    var emp_np = Math.floor(Math.random() * (1000000 - 10) + 10)


    it('get user', async () => {

        req = {
            body: { username: user_name, empNo: emp_np, name: 'Tamanna Mehta' }
        };

        res = {

        };

        await createUser(req, res);

        req = {
            params: { username: user_name }
        };

        res = {
            json(body) {
                console.log("test1");
                console.log(body);
            },
        };

        await getUser(req, res);

    });

});