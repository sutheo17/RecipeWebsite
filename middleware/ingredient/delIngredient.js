/*
    Egy adott étel egyik hozzávalójának kitörlésére szolgál, visszaírányít a hozzávaló módosító oldalra(/ingredient/:foodid)
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository, delNameFood, delNameIngr) {

    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function (req, res, next) {
        if(typeof res.locals.ingredient === 'undefined'){
            return next();
        }

        IngredientModel.deleteOne({_id:req.params.ingredientid}).then(() => {
            return res.redirect('/ingredient/' + res.locals.food._id);
        }).catch((err) => {
            return next(err);
        })
    };

};