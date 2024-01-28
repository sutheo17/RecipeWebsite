/*
    Egy adott étel kitörlésére szolgál, visszaírányít a
    főoldalra (/)
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const FoodModel = requireOption(objectrepository, 'FoodModel');
    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function (req, res, next) {
        if(typeof res.locals.food === 'undefined'){
            return next();
        }

       FoodModel.deleteOne({_id:req.params.foodid}).then(() => {
           IngredientModel.deleteMany({_etele: res.locals.food._id}).then(() => {
               return  res.redirect('/');
           }).catch((err) => {return next(err)});
        }).catch((err) => {
            return next(err);
        })
    };

};