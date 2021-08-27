import express, { Response, Request } from 'express';
import patientsServices from '../services/patientsService';
import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res: Response) => {
  return res.send(patientsServices.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const foundPatient = patientsServices.getPatientById(id);
  if (foundPatient) return res.json(foundPatient).end();
  return res.status(404).send('Patient not found');
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const addedEntry = patientsServices.addEntry(id, req.body);
  console.log(req.body);
  if (addedEntry) return res.json(addedEntry).end();
  return res.status(400).send('Entry not added');
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsServices.addPatient(newPatientEntry);
    return res.json(addedPatient).end();
  } catch (error) {
    if (error instanceof Error) return res.status(400).send(error.message);
  }
});

export default router;
