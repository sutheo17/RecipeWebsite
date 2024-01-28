/*
    Létrehoz új ételt vagy módosít már meglévőt.
    ha res.locals.food nem undefined
    -akkor módosítjuk az adatot és visszaírányitjuk a nyitó (/) oldalra
    ha undefined
    -akkor létrehozzuk az új ételt és visszaírányitjuk a nyitó (/) oldalra
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function (req, res, next) {
        if((typeof req.body.nev === 'undefined') ||
        (typeof  req.body.ido === 'undefined') ||
        (typeof  req.body.elk_neh === 'undefined') ||
        (typeof  req.body.ar === 'undefined')){
            return next();
        }

        if(typeof res.locals.food === 'undefined'){
            res.locals.food = new FoodModel();
        }

        res.locals.food.nev = req.body.nev;
        res.locals.food.ido = req.body.ido;
        res.locals.food.elk_neh = req.body.elk_neh;
        res.locals.food.ar = req.body.ar;

        res.locals.food.save().then(() =>{
            return res.redirect('/');
        }).catch((err) => {
            return next(err);
        });

    };

};