/**
 * @fileOverview Middleware tests.
 */
var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var tester = require('../lib/tester.lib');

var ecrude = require('../../');

describe('Middleware tests', function () {
  beforeEach(function () {
    this.ctrl = tester.entity();
    this.ecrude = ecrude('/middleware', this.ctrl);
    this.reqres = tester.reqres();
    this.stub = sinon.stub();
  });

  function runAssert () {
    expect(this.stub).to.have.been.calledOnce;
    expect(this.stub).to.have.been.calledWith(this.reqres.req, this.reqres.res);
  }

  function createTests (isSingle, operation) {
    it('should add middleware for ' + operation + ' OP, single: ' + isSingle, function (done) {
      if (isSingle) {
        this.ecrude[operation].use(this.stub);
      } else {
        this.ecrude.use(this.stub);
      }
      this.ecrude[operation](this.reqres.req, this.reqres.res)
        .bind(this)
        .then(runAssert)
        .then(done, done);
    });

    it('should accept a promise and be async. OP: ' + operation + ' single: ' + isSingle, function (done) {
      var defer = Promise.defer();
      var asyncOk = false;
      this.stub.returns(defer.promise);

      if (isSingle) {
        this.ecrude[operation].use(this.stub);
      } else {
        this.ecrude.use(this.stub);
      }
      this.ecrude[operation](this.reqres.req, this.reqres.res)
        .bind(this)
        .then(runAssert)
        .then(function () {
          expect(asyncOk).to.be.true;
        })
        .then(done, done);

      setTimeout(function () {
        asyncOk = true;
        defer.resolve();
      }, 30);
    });

    it('should not invoke CRUD OP if error thrown for OP: ' + operation + ' single:' + isSingle, function (done) {
      this.stub.throws(new Error());

      if (isSingle) {
        this.ecrude[operation].use(this.stub);
      } else {
        this.ecrude.use(this.stub);
      }

      var ecrudeOp = operation;
      if (operation === 'readList') {
        ecrudeOp = 'readLimit';
      }

      this.ecrude[operation](this.reqres.req, this.reqres.res)
        .bind(this)
        .catch(runAssert)
        .bind(this)
        .then(function () {
          expect(this.ctrl[ecrudeOp]).to.not.have.been.called;
        })
        .then(done, done);
    });
  }


  describe('Per CRUD OP', function () {
    // create tests
    [
      'create',
      'readList',
      'readOne',
      'update',
      'delete',
    ].forEach(createTests.bind(null, true));
  });
  describe('CRUD wide middleware', function () {
    // create tests
    [
      'create',
      'readList',
      'readOne',
      'update',
      'delete',
    ].forEach(createTests.bind(null, false));
  });
});
