const nock = require('nock');
const assert = require('clutch-assert');

const createUser = require('./../middleware/create-user');
const getUser = require('./../middleware/get-user');

const { v4: uuid } = require('uuid');

describe('Testing login', () => {

    it('create user', async () => {

        var user_name = uuid()
        var emp_np = Math.floor(Math.random() * (500000 - 10001) + 10001)
        req = {
            body: { username: user_name, empNo: emp_np, name: 'Tamanna Mehta' }
        };

        res = {
            json(body) {
                assert.is('body' in body)
            }
        };

        await createUser(req, res);
    });

    it('get user', async () => {
        let username = 'gfacello';
        req = {
            params: { username }
        };

        res = {
            json(body) {
                console.log(body);
                assert.is(body.username, username );
            },
        };

        await getUser(req, res);

    })

});