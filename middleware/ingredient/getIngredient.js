/*
    Egy adott étel egyik hozzávalójának adatait szolgálja vissza.
    -ha nincs ilyen akkor visszaküld a hozzávaló módosító oldalra (/ingredient/:foodid)
    -ha van akkor visszaadja (res.locals.ingredient)
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function (req, res, next) {

        IngredientModel.findOne({_id:req.params.ingredientid}).then((ingredient) =>
        {
            res.locals.ingredient = ingredient;
            return next();
        }).catch((err) => {return next(err)});
    };

};