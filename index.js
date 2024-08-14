const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hi Welcome to Mern Auth');
});

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

module.exports = (req, res) => app(req, res);
