const expect = require('chai').expect;
const assert = require('chai').assert;
const getIngredientListMW= require('../../../middleware/ingredient/getListOfIngredient');
const getFoodListMW = require("../../../middleware/food/getListOfFood");

describe('getListOfIngredient middleware ', function() {

    it(' visszaadja egy adott étel hozzávalóit a res.locals.ingredients-re ', function (done) {

        const reqMock = {};
        const resMock = {
            locals: { food:{_id: 1337}}
        };
        const foodId = 1337;
        let nextBeenCalled = false;
        function nextMock(err) {
            const promise = new Promise(function() {
                expect(resMock.locals.food._id).to.eql(foodId);
                expect(resMock.locals.ingredients).to.eql(['Só', 'Bors', 'Liszt']);
                expect(nextBeenCalled).to.eql(false);
                nextBeenCalled = true;
                done();
            }).catch(done);
        }

        const fakeIngredientModel = {
            find: function ({_etele}) {
                if(_etele === foodId){
                    return Promise.resolve(['Só', 'Bors', 'Liszt']);
                }
                else
                {
                    return Promise.reject('rossz az étel id');
                }
            }
        };

        getIngredientListMW
        ({
            IngredientModel: fakeIngredientModel
        })(reqMock, resMock, nextMock)

    })

    it(' ha nem létezik res.locals.food, akkor next-et hív ', function (done) {

        const reqMock = {};
        const resMock = {
            locals: {}
        };
        let nextBeenCalled = false;

        function nextMock(err) {
            const promise = new Promise(function() {
                expect(resMock.locals.food).to.eql(undefined);
                expect(resMock.locals.ingredients).to.eql(undefined);
                expect(err).to.eql(undefined);
                expect(nextBeenCalled).to.eql(false);
                nextBeenCalled = true;
                done();
            }).catch(done);

        }

        const fakeIngredientModel = {
            find: function () {
                return Promise.reject()
            }
        };

        getIngredientListMW
        ({
            IngredientModel: fakeIngredientModel
        })(reqMock, resMock, nextMock)
    })

    it(' ha létezik res.locals.food, de valami hiba lép fel, akkor next paraméterében továbbadja a hiba okát ', function (done) {

        const reqMock = {};
        const resMock = {
            locals: { food:{_id: 1337}}
        };
        const foodId = 1337;
        let nextBeenCalled = false;

        function nextMock(err) {
            const promise = new Promise(function() {
                expect(resMock.locals.food).to.eql({_id:1337});
                expect(resMock.locals.ingredients).to.eql(undefined);
                expect(err).to.eql('gond van az adatok beolvasása közben');
                expect(nextBeenCalled).to.eql(false);
                nextBeenCalled = true;
                done();
            }).catch(done);

        }

        const fakeIngredientModel = {
            find: function ({_etele}) {
                return Promise.reject('gond van az adatok beolvasása közben');
            }
        };

        getIngredientListMW
        ({
            IngredientModel: fakeIngredientModel
        })(reqMock, resMock, nextMock)
    })

    it(' ha nincs IngredientModel az objectrepositoryban akkor TypeError-t dob', function (done) {

        const reqMock = {};
        const resMock = {
            locals: {}
        };

        function nextMock(err) {

        }

        function mw(){
            getIngredientListMW()
            ({
            })(reqMock, resMock, nextMock)
        }

        assert.throws(mw, Error, "IngredientModel required");
        done();
    })


})
