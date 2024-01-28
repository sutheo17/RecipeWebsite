const expect = require('chai').expect;
const assert = require('chai').assert;
const getFoodListMW= require('../../../middleware/food/getListOfFood');

describe('getListOfFood middleware ', function() {
    it(' visszaadja az ételek listáját a res.locals.foods-ra ', function (done) {

        const reqMock = {};
        const resMock = {
            locals: {}
        };
        let nextBeenCalled = false;
        function nextMock(err) {
            const promise = new Promise(function() {
                expect(resMock.locals.foods).to.eql(['Hamburger', 'Pizza'])
                expect(nextBeenCalled).to.eql(false);
                nextBeenCalled = true;
                done();
            }).catch(done);
        }

        const fakeFoodModel = {
            find: function () {
                return Promise.resolve(['Hamburger', 'Pizza']);
            }
        };

        getFoodListMW
        ({
            FoodModel: fakeFoodModel
        })(reqMock, resMock, nextMock)

    })

    it(' ha hiba van, a next paraméterében továbbadja a hiba okát ', function (done) {

        const reqMock = {};
        const resMock = {
            locals: {}
        };
        let nextBeenCalled = false;

        function nextMock(err) {
            const promise = new Promise(function() {
                expect(err).to.eql('gond van az adatok beolvasása közben');
                expect(nextBeenCalled).to.eql(false);
                expect(resMock.locals.foods).to.eql(undefined);
                nextBeenCalled = true;
                done();
            }).catch(done);

        }

        const fakeFoodModel = {
            find: function () {
                return Promise.reject('gond van az adatok beolvasása közben');
            }
        };

        getFoodListMW
        ({
            FoodModel: fakeFoodModel
        })(reqMock, resMock, nextMock)
    })
    it(' ha nincs FoodModel az objectrepositoryban akkor TypeError-t dob', function (done) {

        const reqMock = {};
        const resMock = {
            locals: {}
        };

        function nextMock(err) {

        }

        function mw(){
            getFoodListMW
            ({
            })(reqMock, resMock, nextMock)
        }

        assert.throws(mw, Error, "FoodModel required");
        done();
    })
})
