/*
    Visszaadja egy adott étel hozzávalóinak listáját adja vissza (res.locals.ingredients)
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function (req, res, next) {
        if(typeof res.locals.food === 'undefined'){
            return next();
        }
        IngredientModel.find({_etele: res.locals.food._id}).then((ingredients) => {
            res.locals.ingredients = ingredients;
            return next();
        }).catch((err) => {return next(err)});
    };

};