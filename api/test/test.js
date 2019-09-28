import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the Binimi endpoints:', () => {
  it('It should create a patient', (done) => {
    const patient = {
      name: 'Salako Dada',
      hospital_no: 9,
      gender: 'Male'
    };
    chai.request(app)
      .post('/api/v1/binimi')
      .set('Accept', 'application/json')
      .send(patient)
      .end((err, res) => {
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

  it('It should not create a patient with incomplete parameters', (done) => {
    const patient = {
      hospital_no: '2',
      gender: 'Female'
    };
    chai.request(app)
      .post('/api/v1/binimi')
      .set('Accept', 'application/json')
      .send(patient)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all patients', (done) => {
    chai.request(app)
      .get('/api/v1/binimi')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('hospital_no');
        res.body.data[0].should.have.property('gender');
        done();
      });
  });

  it('It should get a particular patient', (done) => {
    const patientId = 1;
    chai.request(app)
      .get(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('hospital_no');
        res.body.data.should.have.property('gender');
        done();
      });
  });

  it('It should not get a particular patient with invalid id', (done) => {
    const patientId = 8888;
    chai.request(app)
      .get(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find patient with the id ${patientId}`);
        done();
      });
  });

  it('It should not get a particular patient with non-numeric id', (done) => {
    const patientId = 'aaa';
    chai.request(app)
      .get(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a patient', (done) => {
    const patientId = 1;
    const updatedPatient = {
      id: patientId,
      name: 'Sesame Bam',
      hospital_no: '3',
      gender: 'Male'
    };
    chai.request(app)
      .put(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .send(updatedPatient)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedPatient.id);
        expect(res.body.data.name).equal(updatedPatient.name);
        expect(res.body.data.hospital_no).equal(updatedPatient.hospital_no);
        expect(res.body.data.gender).equal(updatedPatient.gender);
        done();
      });
  });

  it('It should not update a patient with invalid id', (done) => {
    const patientId = '9999';
    const updatedPatient = {
      id: patientId,
      name: 'Sasame Bam',
      hospital_no: '23',
      gender: 'Male'
    };
    chai.request(app)
      .put(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .send(updatedPatient)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find patient with the id: ${patientId}`);
        done();
      });
  });

  it('It should not update a patient with non-numeric id value', (done) => {
    const patientId = 'ggg';
    const updatedPatient = {
      id: patientId,
      name: 'Sesame Dada',
      hospital_no: '9',
      gender: 'Male'
    };
    chai.request(app)
      .put(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .send(updatedPatient)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete a patient', (done) => {
    const patientId = 1;
    chai.request(app)
      .delete(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a patient with invalid id', (done) => {
    const patientId = 777;
    chai.request(app)
      .delete(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Patient with the id ${patientId} cannot be found`);
        done();
      });
  });

  it('It should not delete a patient with non-numeric id', (done) => {
    const patientId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/binimi/${patientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});