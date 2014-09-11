/**
 * @fileOverview DELETE OP tests.
 */
var chai = require('chai');
var expect = chai.expect;

var ecrude = require('../..');

var testCase = require('crude-test-case');
testCase.setCrude(ecrude);

var Web = testCase.Web;

describe('Delete OPs', function() {
  this.timeout(5000);

  testCase.tester.init(true);

  testCase.libUser.createUser();

  beforeEach(function() {
    var web = new Web();
    this.req = web.req;
  });

  beforeEach(function () {
    // Setup ecrude
    this.Entity = testCase.UserEnt;
    this.ecrude = ecrude('/mockDelete', this.Entity, testCase.expressApp.app);
    this.ecrude.config({
      idField: '_id',
    });
  });

  describe('Delete record', function () {
    beforeEach(function(done) {
      var self = this;
      this.req.del('/mockDelete/' + this.udo.id)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            console.error('ERROR. Body:', res.body);
            done(err);
            return;
          }

          self.body = res.body;
          done();
        });
    });

    it('Should have removed the user', function (done) {
      this.userEnt.readOne(this.udo.id)
        .then(function(res) {
          expect(res).to.be.null;
        })
        .then(done, done);
    });
  });
});
