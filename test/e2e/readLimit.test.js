/**
 * @fileOverview Read Limit OP tests.
 */
var chai = require('chai');
var expect = chai.expect;

var ecrude = require('../..');

var testCase = require('crude-test-case');
testCase.setCrude(ecrude);
var Web = testCase.Web;

describe('Read Limit OP', function() {
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
    this.ecrude = ecrude('/mockLimit', this.Entity, testCase.expressApp.app);
  });

  describe('Standard Read Limit', function () {
    beforeEach(function(done) {
      var self = this;
      this.req.get('/mockLimit')
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

    it('Should have proper type and length', function() {
      expect(this.body).to.be.an('array');
      expect(this.body).to.have.length(3);
    });
    it('Should have proper keys', function () {
      expect(this.body[0]).to.have.keys([
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
      expect(this.body[0].firstName).to.equal('John');
      expect(this.body[0].lastName).to.equal('Doe');
      expect(this.body[0].companyName).to.equal('');
      expect(this.body[0].email).to.equal('pleasant@hq.com');
      expect(this.body[0].password).to.equal('123456');
      expect(this.body[0].createdOn).to.match(testCase.tester.reIso8601);
      expect(this.body[0].isVerified).to.equal(true);
      expect(this.body[0].isDisabled).to.equal(false);
      expect(this.body[0].isAdmin).to.equal(false);
    });
  });
});
