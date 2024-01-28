var renderMW =  require('../middleware/common/render')

var getFoodMW = require('../middleware/food/getFood')
var delIngredientMW = require('../middleware/ingredient/delIngredient')
var getIngredientMW = require('../middleware/ingredient/getIngredient')
var getListOfIngredientMW = require('../middleware/ingredient/getListOfIngredient')
var saveIngredientMW = require('../middleware/ingredient/saveIngredient')

const FoodModel = require('../models/food');
const IngredientModel = require('../models/ingredient');

module.exports = function (app) {
    var objectRepository = {
        FoodModel: FoodModel,
        IngredientModel: IngredientModel
    };

    app.get('/ingredient/:foodid',
        getFoodMW(objectRepository),
        getListOfIngredientMW(objectRepository),
        renderMW(objectRepository, 'ingredient')
    );

    app.use('/ingredient/add/:foodid',
        getFoodMW(objectRepository),
        saveIngredientMW(objectRepository),
        renderMW(objectRepository, 'addingredient'),
        function (req, res, next) {
            return res.redirect('/ingredient/:foodid');
        }
    );

    app.use('/ingredient/modify/:foodid/:ingredientid',
        getFoodMW(objectRepository),
        getIngredientMW(objectRepository),
        saveIngredientMW(objectRepository),
        renderMW(objectRepository, 'modifyingredient'),
        function (req, res, next) {
            return res.redirect('/ingredient/:foodid');
        }
    );

    app.use('/ingredient/delete/:foodid/:ingredientid',
        getFoodMW(objectRepository),
        getIngredientMW(objectRepository),
        delIngredientMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/ingredient/:foodid');
        }
    );
};