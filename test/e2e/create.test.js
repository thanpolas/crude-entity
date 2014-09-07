/**
 * @fileOverview Create OP tests.
 */
var chai = require('chai');
var expect = chai.expect;

var ecrude = require('../../');

var testCase = require('crude-test-case');
testCase.setCrude(ecrude);

var Web = testCase.Web;
var userFix = testCase.fixUser;

describe.only('Create OPs', function() {
  this.timeout(5000);

  testCase.tester.init(true);

  beforeEach(function() {
    var web = new Web();
    this.req = web.req;
  });

  beforeEach(function () {
    // Setup ecrude
    this.Entity = testCase.UserEnt;
    this.ecrude = ecrude('/mock', this.Entity, testCase.expressApp.app);
  });

  beforeEach(testCase.db.nuke);
  afterEach(testCase.db.nuke);

  describe('Create a record', function () {
    beforeEach(function(done) {
      var self = this;
      this.req.post('/mock')
        .send(userFix.one)
        .expect(201)
        .end(function(err, res) {
          if (err) {
            console.error('ERROR. Body:', err, (res && res.body));
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
      expect(this.body.firstName).to.equal('John');
      expect(this.body.lastName).to.equal('Doe');
      expect(this.body.companyName).to.equal('');
      expect(this.body.email).to.equal('pleasant@hq.com');
      expect(this.body.password).to.equal('123456');
      expect(this.body.createdOn).to.match(testCase.tester.reIso8601);
      expect(this.body.isVerified).to.equal(false);
      expect(this.body.isDisabled).to.equal(false);
      expect(this.body.isAdmin).to.equal(false);
    });
  });
});
