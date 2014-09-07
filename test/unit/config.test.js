/**
 * @fileOverview Configuration tests.
 */
var Promise = require('bluebird');
var sinon = require('sinon');

var tester = require('../lib/tester.lib');
var chai = require('chai');
var expect = chai.expect;

var crude = require('../../');

describe.only('Configuration tests', function () {
  beforeEach(function () {
    this.Entity = tester.entity();
    this.crude = crude('/middleware', this.Entity);
    this.reqres = tester.reqres();
    this.stub = sinon.stub();
  });

  describe('Surface tests', function () {
    it('config returns a promise', function () {
      expect(this.crude.config().then).to.be.a('function');
    });

    it('returns null when promise resolves', function () {
      return expect(this.crude.config()).to.eventually.be.null;
    });
  });

  describe('Configurability tests', function () {

    describe('Configure the "idField"', function () {
      beforeEach(function () {
        return this.crude.config({
          idField: '_id'
        });
      });

      beforeEach(function () {
        this.reqres.req.params.id = 'one';
        return Promise.all([
          this.crude.readOne(this.reqres.req, this.reqres.res),
          this.crude.update(this.reqres.req, this.reqres.res),
          this.crude.delete(this.reqres.req, this.reqres.res),
        ]);
      });

      it('readOne OP', function () {
        expect(this.Entity.prototype.readOne).to.have.been.calledWith({_id: 'one'});
      });
      it('update OP', function () {
        expect(this.Entity.prototype.update).to.have.been.calledWith({_id: 'one'});
      });
      it('delete OP', function () {
        expect(this.Entity.prototype.delete).to.have.been.calledWith({_id: 'one'});
      });
    });
  });
});
