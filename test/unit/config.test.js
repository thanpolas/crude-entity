/**
 * @fileOverview Configuration tests.
 */
var Promise = require('bluebird');
var sinon = require('sinon');

var tester = require('../lib/tester.lib');
var chai = require('chai');
var expect = chai.expect;

var crude = require('../../');

describe('Configuration tests', function () {
  beforeEach(function () {
    this.Entity = tester.entity();
    this.crude = crude('/middleware', this.Entity);
    this.reqres = tester.reqres();
    this.stub = sinon.stub();
  });

  describe('Surface tests', function () {
    it('config returns self', function () {
      expect(this.crude.config()).to.equal(this.crude);
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
          this.crude._readOne(this.reqres.req, this.reqres.res),
          this.crude._update(this.reqres.req, this.reqres.res),
          this.crude._delete(this.reqres.req, this.reqres.res),
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

    describe('Configure Entity methods', function () {
      beforeEach(function () {
        this.Entity.prototype.createNew = sinon.stub();
        this.Entity.prototype.readNew = sinon.stub();
        this.Entity.prototype.readLimitNew = sinon.stub();
        this.Entity.prototype.readOneNew = sinon.stub();
        this.Entity.prototype.updateNew = sinon.stub();
        this.Entity.prototype.deleteNew = sinon.stub();
        this.Entity.prototype.countNew = sinon.stub();
      });
      beforeEach(function () {
        return this.crude.config({
          entityCreate: 'createNew',
          entityRead: 'readNew',
          entityReadLimit: 'readLimitNew',
          entityReadOne: 'readOneNew',
          entityUpdate: 'updateNew',
          entityDelete: 'deleteNew',
          entityCount: 'countNew',
        });
      });
      beforeEach(function () {
        this.reqres.req.params.id = 'one';
        return Promise.all([
          this.crude._create(this.reqres.req, this.reqres.res),
          this.crude._readList(this.reqres.req, this.reqres.res),
          this.crude._readOne(this.reqres.req, this.reqres.res),
          this.crude._update(this.reqres.req, this.reqres.res),
          this.crude._delete(this.reqres.req, this.reqres.res),
        ]);
      });
      it('should invoke the right method on create OP', function () {
        expect(this.Entity.prototype.create).to.not.have.been.called;
        expect(this.Entity.prototype.createNew).to.have.been.called;
      });
      it('should invoke the right method on readList OP', function () {
        expect(this.Entity.prototype.readLimit).to.not.have.been.called;
        expect(this.Entity.prototype.readLimitNew).to.have.been.called;
        expect(this.Entity.prototype.count).to.not.have.been.called;
        expect(this.Entity.prototype.countNew).to.have.been.called;
      });
      it('should invoke the right method on update OP', function () {
        expect(this.Entity.prototype.update).to.not.have.been.called;
        expect(this.Entity.prototype.updateNew).to.have.been.called;
      });
      it('should invoke the right method on readOne OP', function () {
        expect(this.Entity.prototype.readOne).to.not.have.been.called;
        expect(this.Entity.prototype.readOneNew).to.have.been.called;
      });
      it('should invoke the right method on delete OP', function () {
        expect(this.Entity.prototype.delete).to.not.have.been.called;
        expect(this.Entity.prototype.deleteNew).to.have.been.called;
      });
    });
  });
});
