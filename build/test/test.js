"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the Binimi endpoints:', function () {
  it('It should create a patient', function (done) {
    var patient = {
      name: 'Salako Dada',
      hospital_no: 9,
      gender: 'Male'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/binimi').set('Accept', 'application/json').send(patient).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        id: 1,
        name: patient.name,
        hospital_no: patient.hospital_no,
        gender: patient.gender
      });
      done();
    });
  });
  it('It should not create a patient with incomplete parameters', function (done) {
    var patient = {
      hospital_no: '2',
      gender: 'Female'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/binimi').set('Accept', 'application/json').send(patient).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('It should get all patients', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/binimi').set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('name');
      res.body.data[0].should.have.property('hospital_no');
      res.body.data[0].should.have.property('gender');
      done();
    });
  });
  it('It should get a particular patient', function (done) {
    var patientId = 1;

    _chai["default"].request(_index["default"]).get("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('name');
      res.body.data.should.have.property('hospital_no');
      res.body.data.should.have.property('gender');
      done();
    });
  });
  it('It should not get a particular patient with invalid id', function (done) {
    var patientId = 8888;

    _chai["default"].request(_index["default"]).get("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find patient with the id ".concat(patientId));
      done();
    });
  });
  it('It should not get a particular patient with non-numeric id', function (done) {
    var patientId = 'aaa';

    _chai["default"].request(_index["default"]).get("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value');
      done();
    });
  });
  it('It should update a patient', function (done) {
    var patientId = 1;
    var updatedPatient = {
      id: patientId,
      name: 'Sesame Bam',
      hospital_no: '3',
      gender: 'Male'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').send(updatedPatient).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.id).equal(updatedPatient.id);
      expect(res.body.data.name).equal(updatedPatient.name);
      expect(res.body.data.hospital_no).equal(updatedPatient.hospital_no);
      expect(res.body.data.gender).equal(updatedPatient.gender);
      done();
    });
  });
  it('It should not update a patient with invalid id', function (done) {
    var patientId = '9999';
    var updatedPatient = {
      id: patientId,
      name: 'Sasame Bam',
      hospital_no: '23',
      gender: 'Male'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').send(updatedPatient).end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find patient with the id: ".concat(patientId));
      done();
    });
  });
  it('It should not update a patient with non-numeric id value', function (done) {
    var patientId = 'ggg';
    var updatedPatient = {
      id: patientId,
      name: 'Sesame Dada',
      hospital_no: '9',
      gender: 'Male'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').send(updatedPatient).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value');
      done();
    });
  });
  it('It should delete a patient', function (done) {
    var patientId = 1;

    _chai["default"].request(_index["default"])["delete"]("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.include({});
      done();
    });
  });
  it('It should not delete a patient with invalid id', function (done) {
    var patientId = 777;

    _chai["default"].request(_index["default"])["delete"]("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Patient with the id ".concat(patientId, " cannot be found"));
      done();
    });
  });
  it('It should not delete a patient with non-numeric id', function (done) {
    var patientId = 'bbb';

    _chai["default"].request(_index["default"])["delete"]("/api/v1/binimi/".concat(patientId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please provide a numeric value');
      done();
    });
  });
});
//# sourceMappingURL=test.js.map