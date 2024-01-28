const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Food = db.model('Food', {
    nev: String,
    ido: Number,
    elk_neh: String,
    ar: String
});

module.exports = Food;