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

      it('should work on pagination', function () {
        this.Entity.prototype.readLimit.throws(this.err);
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate'));

      });
      it('should work on read all', function () {
        this.Entity.prototype.read.throws(this.err);
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read'));
      });
      it('should work on read one', function () {
        this.Entity.prototype.readOne.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'));
      });
      it('should work on update', function () {
        this.Entity.prototype.update.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'));
      });
      it('should work on delete', function () {
        this.Entity.prototype.delete.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'));
      });
      it('should work on create', function () {
        this.Entity.prototype.create.throws(this.err);
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create'));
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

      it('should work on pagination', function () {
        this.Entity.prototype.readLimit.throws(this.err);
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate'));

      });
      it('should work on read all', function () {
        this.Entity.prototype.read.throws(this.err);
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read'));
      });
      it('should work on read one', function () {
        this.Entity.prototype.readOne.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'));
      });
      it('should work on update', function () {
        this.Entity.prototype.update.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'));
      });
      it('should work on delete', function () {
        this.Entity.prototype.delete.throws(this.err);
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'));
      });
      it('should work on create', function () {
        this.Entity.prototype.create.throws(this.err);
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create'));
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

      it('should work on pagination', function () {
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate', null, true));
      });
      it('should work on read all', function () {
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read', null, true));
      });
      it('should work on read one', function () {
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'));
      });
      it('should work on update', function () {
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'));
      });
      it('should work on delete', function () {
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'));
      });
      it('should work on create', function () {
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create', 201));
      });

    });

    describe('Custom Success Handler', function () {
      beforeEach(function () {
        this.handleStub = sinon.spy();
        this.ecrude.onSuccess(this.handleStub);
      });

      it('should work on pagination', function () {
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('paginate', null, true));

      });
      it('should work on read all', function () {
        this.ecrude.config({pagination: false});
        return this.ecrude._readList(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('read', null, true));
      });
      it('should work on read one', function () {
        this.reqres.req.params.id = 'one';
        return this.ecrude._readOne(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('readOne'));
      });
      it('should work on update', function () {
        this.reqres.req.params.id = 'one';
        return this.ecrude._update(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('update'));
      });
      it('should work on delete', function () {
        this.reqres.req.params.id = 'one';
        return this.ecrude._delete(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('delete'));
      });
      it('should work on create', function () {
        return this.ecrude._create(this.reqres.req, this.reqres.res)
          .bind(this)
          .then(runAssert('create', 201));
      });
    });
  });


});
