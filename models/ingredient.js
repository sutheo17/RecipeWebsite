const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Ingredient = db.model('Ingredient', {
    nev: String,
    menny: Number,
    mert: String,
    _etele: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }
});

module.exports = Ingredient;