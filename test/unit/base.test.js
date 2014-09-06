/**
 * @fileOverview Read OP tests.
 */
var chai = require('chai');
var expect = chai.expect;

var tester = require('../lib/tester.lib');

var ecrude = require('../../');

describe('API Surface', function() {
  describe('Ctor Exposed API', function () {
    it('ecrude should be a function', function() {
      expect(ecrude).to.be.a('function');
    });
    it('should expose CRUD enum', function() {
      expect(ecrude.CrudOps).to.be.an('object');
      expect(ecrude.CrudOps).to.have.keys([
        'CREATE',
        'READ',
        'READ_ONE',
        'PAGINATE',
        'UPDATE',
        'DELETE',
      ]);
    });
  });

  describe('Instance exposed API', function () {
    beforeEach(function () {
      this.ecrude = ecrude('/test', tester.entity());
    });
    it('should expose expected methods', function () {
      expect(this.ecrude.config).to.be.a('function');
      expect(this.ecrude.use).to.be.a('function');
      expect(this.ecrude.addRoutes).to.be.a('function');
      expect(this.ecrude.onSuccess).to.be.a('function');
      expect(this.ecrude.onError).to.be.a('function');
      expect(this.ecrude.create).to.be.a('function');
      expect(this.ecrude.readOne).to.be.a('function');
      expect(this.ecrude.readList).to.be.a('function');
      expect(this.ecrude.update).to.be.a('function');
      expect(this.ecrude.delete).to.be.a('function');
    });
    it('should generate a new instance', function() {
      this.ecrude.__test = 1;
      var neweCrude = ecrude('/run', tester.entity());
      expect(neweCrude.__test).to.not.equal(this.ecrude.__test);
    });
    it('should get an instance with the "new" keyword', function() {
      this.ecrude.__test = 1;
      var neweCrude = new ecrude('/run', tester.entity());
      expect(neweCrude.__test).to.not.equal(this.ecrude.__test);
    });
  });
});
