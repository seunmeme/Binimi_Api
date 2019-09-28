import { Router } from 'express';
import PatientController from '../controllers/Controller';

const router = Router();

router.get('/', PatientController.getAllPatients);
router.post('/', PatientController.addPatient);
router.get('/:id', PatientController.getAPatient);
router.put('/:id', PatientController.updatedPatient);
router.delete('/:id', PatientController.deletePatient);

export default router;