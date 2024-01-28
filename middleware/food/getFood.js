/*
    Egy adott étel (foodid param) adatait szolgálja vissza.
    -ha nincs ilyen akkor visszaküld a kezdőlapra
    -ha van akkor visszaadja (res.locals.food)
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function (req, res, next) {

        FoodModel.findOne({_id:req.params.foodid}).then((food) =>
        {
            res.locals.food = food;
            return next();
        }).catch((err) => {return next(err)});
    };

};