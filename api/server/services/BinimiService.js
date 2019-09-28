import database from '../src/models';

class BinimiService {
  static async getAllPatients() {
    try {
      return await database.Binimi.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addPatient(newPatient) {
    try {
      return await database.Binimi.create(newPatient);
    } catch (error) {
      throw error;
    }
  }

  static async updatePatient(id, updatePatient) {
    try {
      const patientToUpdate = await database.Binimi.findOne({
        where: { id: Number(id) }
      });

      if (patientToUpdate) {
        await database.Binimi.update(updatePatient, { where: { id: Number(id) } });

        return updatePatient;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAPatient(id) {
    try {
      const thePatient = await database.Binimi.findOne({
        where: { id: Number(id) }
      });

      return thePatient;
    } catch (error) {
      throw error;
    }
  }

  static async deletePatient(id) {
    try {
      const patientToDelete = await database.Binimi.findOne({ where: { id: Number(id) } });

      if (patientToDelete) {
        const deletedPatient = await database.Binimi.destroy({
          where: { id: Number(id) }
        });
        return deletedPatient;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default BinimiService;