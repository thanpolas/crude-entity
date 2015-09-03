/**
 * @fileOverview Error & Success handlers tests
 */
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var tester = require('../lib/tester.lib');

var ecrude = require('../../');

describe('Error and Success Handlers', function () {
  beforeEach(function () {
    this.Entity = tester.entity();
    this.ecrude = ecrude('/test', this.Entity);
    this.reqres = tester.reqres();
  });

  describe('Error Handlers', function () {
    beforeEach(function () {
      this.err = new Error('yum');
    });
    afterEach(function () {
    });

    describe('Built-in Error Handler', function () {
      beforeEach(function () {
        this.handleStub = sinon.stub(this.ecrude.opts, 'onError');
      });
      afterEach(function () {
        this.handleStub.restore();
      });

      function runAssert(operation) {
        return function () {
          expect(this.handleStub).to.have.been.calledOnce;
          expect(this.handleStub).to.have.been.calledWith(this.reqres.req,
            this.reqres.res, operation, 400, this.err);
        };
      }

      it('should work on pagination', function (done) {
        this.Entity.prototype.readLimit.throws(this.err);
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate'))
          .then(done, done);

      });
      it('should work on read all', function (done) {
        this.Entity.prototype.read.throws(this.err);
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read'))
          .then(done, done);
      });
      it('should work on read one', function (done) {
        this.Entity.prototype.readOne.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'))
          .then(done, done);
      });
      it('should work on update', function (done) {
        this.Entity.prototype.update.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'))
          .then(done, done);
      });
      it('should work on delete', function (done) {
        this.Entity.prototype.delete.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'))
          .then(done, done);
      });
      it('should work on create', function (done) {
        this.Entity.prototype.create.throws(this.err);
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create'))
          .then(done, done);
      });

    });

    describe('Custom Error Handler', function () {
      function runAssert (operation) {
        return function () {
          expect(this.spy).to.have.been.calledOnce;
          expect(this.spy).to.have.been.calledWith(this.reqres.req, this.reqres.res,
            operation, 400, this.err);
        };
      }
      beforeEach(function () {
        this.spy = sinon.spy();
        this.ecrude.onError(this.spy);
      });

      it('should work on pagination', function (done) {
        this.Entity.prototype.readLimit.throws(this.err);
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate'))
          .then(done, done);

      });
      it('should work on read all', function (done) {
        this.Entity.prototype.read.throws(this.err);
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read'))
          .then(done, done);
      });
      it('should work on read one', function (done) {
        this.Entity.prototype.readOne.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'))
          .then(done, done);
      });
      it('should work on update', function (done) {
        this.Entity.prototype.update.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'))
          .then(done, done);
      });
      it('should work on delete', function (done) {
        this.Entity.prototype.delete.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'))
          .then(done, done);
      });
      it('should work on create', function (done) {
        this.Entity.prototype.create.throws(this.err);
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create'))
          .then(done, done);
      });
    });
  });

  describe('Success Handlers', function () {
    function runAssert(operation, optHttpCode, optArr) {
      var httpCode = optHttpCode || 200;

      return function() {
        var result = this.ecrude.entity.__item;
        if (optArr) {
          result = [this.ecrude.entity.__item];
        }

        expect(this.handleStub).to.have.been.calledOnce;
        expect(this.handleStub).to.have.been.calledWith(this.reqres.req,
          this.reqres.res, operation, httpCode, result);
      };
    }

    describe('Built-in Success Handler', function () {
      beforeEach(function() {
        this.handleStub = sinon.stub(this.ecrude.opts, 'onSuccess');
      });
      afterEach(function() {
        this.handleStub.restore();
      });

      it('should work on pagination', function (done) {
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate', null, true))
          .then(done, done);
      });
      it('should work on read all', function (done) {
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read', null, true))
          .then(done, done);
      });
      it('should work on read one', function (done) {
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'))
          .then(done, done);
      });
      it('should work on update', function (done) {
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'))
          .then(done, done);
      });
      it('should work on delete', function (done) {
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'))
          .then(done, done);
      });
      it('should work on create', function (done) {
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create', 201))
          .then(done, done);
      });

    });

    describe('Custom Success Handler', function () {
      beforeEach(function () {
        this.handleStub = sinon.spy();
        this.ecrude.onSuccess(this.handleStub);
      });

      it('should work on pagination', function (done) {
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate', null, true))
          .then(done, done);

      });
      it('should work on read all', function (done) {
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read', null, true))
          .then(done, done);
      });
      it('should work on read one', function (done) {
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'))
          .then(done, done);
      });
      it('should work on update', function (done) {
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'))
          .then(done, done);
      });
      it('should work on delete', function (done) {
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'))
          .then(done, done);
      });
      it('should work on create', function (done) {
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create', 201))
          .then(done, done);
      });
    });
  });


});
