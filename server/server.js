require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('<h1>Bienvenido a mi servidor REST(localhost)</h1>');
});

app.use(require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/cafeteria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => { // 3606 sql
    if (err) throw err;
    console.log('base de datos online');
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
});

app.listen(process.env.PORT, () => {
    console.log('el servidor esta en linea en el puerto:', process.env.PORT);
});