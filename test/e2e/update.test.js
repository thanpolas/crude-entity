/**
 * @fileOverview UPDATE OP tests.
 */
var chai = require('chai');
var expect = chai.expect;

var ecrude = require('../..');

var testCase = require('crude-test-case');
testCase.setCrude(ecrude);
var Web = testCase.Web;

describe('Update OPs', function() {
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
    this.ecrude = ecrude('/mockUpdate', this.Entity, testCase.expressApp.app);
    return this.ecrude.config({
      idField: '_id',
    });
  });

  describe('Update records', function () {
    beforeEach(function(done) {
      var self = this;
      this.req.post('/mockUpdate/' + this.udo.id)
        .send({
          firstName: 'newFirst',
          lastName: 'newLast',
        })
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

    it('Should have proper keys', function () {
      expect(this.body).to.have.keys([
        '__v',
        '_id',
        'firstName',
        'lastName',
        'birthdate',
        'companyName',
        'email',
        'password',
        'createdOn',
        'isVerified',
        'isDisabled',
        'isAdmin',
      ]);
    });
    it('Should have proper values', function () {
      expect(this.body.firstName).to.equal('newFirst');
      expect(this.body.lastName).to.equal('newLast');
      expect(this.body.companyName).to.equal('');
      expect(this.body.email).to.equal('pleasant@hq.com');
      expect(this.body.password).to.equal('123456');
      expect(this.body.createdOn).to.match(testCase.tester.reIso8601);
      expect(this.body.isVerified).to.equal(true);
      expect(this.body.isDisabled).to.equal(false);
      expect(this.body.isAdmin).to.equal(false);
    });
  });
});
