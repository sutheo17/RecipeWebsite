/*
    Létrehoz új hozzávalót vagy módosít már meglévőt egy adott ételnél.
    ha res.locals.food és res.locals.ingredient nem undefined
    -akkor módosítjuk az adatot és visszaírányitjuk a hozzávaló módosító oldalra (/ingredient/:foodid)
    ha undefined valamelyik
    -akkor létrehozzuk az új hozzávalót és visszaírányitjuk a hozzávaló módosító oldalra (/ingredient/:foodid)
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function (req, res, next) {
        if((typeof req.body.nev === 'undefined') ||
            (typeof  req.body.mert === 'undefined') ||
            (typeof  req.body.menny === 'undefined') ||
            (typeof  res.locals.food === 'undefined')){
            return next();
        }

        if(typeof res.locals.ingredient === 'undefined'){
            res.locals.ingredient = new IngredientModel();
        }

        res.locals.ingredient.nev = req.body.nev;
        res.locals.ingredient.mert = req.body.mert;
        res.locals.ingredient.menny = req.body.menny;
        res.locals.ingredient._etele = res.locals.food._id;

        res.locals.ingredient.save().then(() =>{
            return res.redirect('/ingredient/' + res.locals.food._id);
        }).catch((err) => {
            return next(err);
        });

    };

};