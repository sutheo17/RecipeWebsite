var renderMW =  require('../middleware/common/render')

var getListOfFoodMW = require('../middleware/food/getListOfFood')
var saveFoodMW = require('../middleware/food/saveFood')
var getFoodMW = require('../middleware/food/getFood')
var delFoodMW = require('../middleware/food/delFood')

const FoodModel = require('../models/food');
const IngredientModel = require('../models/ingredient');

module.exports = function (app) {
    var objectRepository = {
        FoodModel: FoodModel,
        IngredientModel: IngredientModel
    };

    app.use('/food/add',
        saveFoodMW(objectRepository),
        renderMW(objectRepository, 'addfood'),
    );

    app.use('/food/modify/:foodid',
        getFoodMW(objectRepository),
        saveFoodMW(objectRepository),
        renderMW(objectRepository, 'modifyfood'),
    );

    app.use('/food/delete/:foodid',
        getFoodMW(objectRepository),
        delFoodMW(objectRepository),
    );

    app.get('/',
        getListOfFoodMW(objectRepository),
        renderMW(objectRepository, 'index')
    );
};