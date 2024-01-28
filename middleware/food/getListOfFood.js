/*
    Visszaadja az ételek listáját adja vissza (res.locals.foods)
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function (req, res, next) {
        FoodModel.find({}).then((foods) => {
            res.locals.foods = foods;
            return next();
        }).catch((err) => {return next(err)
        });
    };

};