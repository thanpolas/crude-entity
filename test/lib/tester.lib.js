/**
 * @fileOverview Testers common library.
 */

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
chai.use(sinonChai);

var tester = module.exports = {};

/**
 * Returns A stub Entity to perform tests on.
 *
 * @return {Function} A stub Entity Ctor.
 */
tester.entity = function() {
  var item = {a: 1};

  var Entity = function () {
    this.__item = item;
  };

  Entity.prototype.create = sinon.stub().returns(item);
  Entity.prototype.read = sinon.stub().returns([item]);
  Entity.prototype.readLimit = sinon.stub().returns([item]);
  Entity.prototype.readOne = sinon.stub().returns(item);
  Entity.prototype.update = sinon.stub().returns(item);
  Entity.prototype.count = sinon.stub().returns(1);
  Entity.prototype.delete = sinon.stub().returns(item);

  return Entity;
};

/**
 * Return express Request / Response objects.
 *
 * @return {Object} Req Res mocks.
 */
tester.reqres = function() {
  var reqres = {
    req: {
      query: {},
      body: {},
      params: {},
      url: 'http://localhost/',
      app: {
        settings: {
          port: 80,
        },
      },
    },
    res: {
      status: sinon.mock(),
      set: sinon.mock(),
      json: sinon.mock(),
    },
  };

  reqres.res.status.returns(reqres.res);

  return reqres;
};
