import BinimiService from '../services/BinimiService';
import Util from '../utils/Utils';

const util = new Util();

class PatientController {
  static async getAllPatients(req, res) {
    try {
      const allPatients = await BinimiService.getAllPatients();
      if (allPatients.length > 0) {
        util.setSuccess(200, 'Patients retrieved', allPatients);
      } else {
        util.setSuccess(200, 'No patient found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addPatient(req, res) {
    if (!req.body.name || !req.body.hospital_no || !req.body.gender) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newPatient = req.body;
    try {
      const createdPatient = await BinimiService.addPatient(newPatient);
      util.setSuccess(201, 'Patient Added!', createdPatient);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedPatient(req, res) {
    const alteredPatient = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updatePatient = await BinimiService.updatePatient(id, alteredPatient);
      if (!updatePatient) {
        util.setError(404, `Cannot find patient with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Patient updated', updatePatient);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAPatient(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const thePatient = await BinimiService.getAPatient(id);

      if (!thePatient) {
        util.setError(404, `Cannot find patient with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Patient', thePatient);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deletePatient(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const patientToDelete = await BinimiService.deletePatient(id);

      if (patientToDelete) {
        util.setSuccess(200, 'Patient deleted');
      } else {
        util.setError(404, `Patient with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default PatientController;