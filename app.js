'use strict';

const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config');
const app = express()
const router = require('./routes/external/login');
const cors = require('cors')

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = 4001

// Health endpoint for AWS ELB
app.get('/health', function (req, res) {
    console.log("Health Endpoint Hit");
    res.status(200).end();
});

app.use('/login', router);

app.listen(port, () => {
    console.log(`Login Service listening at http://localhost:${port}`)
})